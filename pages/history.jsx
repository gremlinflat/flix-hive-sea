import React from "react";
import useSWR from "swr";
import Head from "next/head";
import fetcher from "@/utils/fetcher";
import DashboardShell from "@/components/DashboardShell";
import LoadingState from "@/components/LoadingState";
import { useAuth } from "@/lib/auth";
import { useAlert } from "@/lib/alert";
import TransactionCell from "@/components/TransactionCell";

const UserTransaction = () => {
  const { userToken, userProfile, setUserProfile } = useAuth();
  const { showAlertMessage } = useAlert();
  const { data: usersHistory, mutate: mutateUsersHistory } = useSWR(
    [`/api/user/getAllTicket`, userToken],
    fetcher
  );

  if (!usersHistory) {
    return (
      <DashboardShell>
        <LoadingState />
      </DashboardShell>
    );
  }

  const handleCancel = async (id) => {
    await fetch(`/api/ticket/cancelTicket`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        token: userToken,
      }),
      body: JSON.stringify({
        ticket_id: id,
      }),
    }).then((res) => res.json());

    //refunding
    const ticket = usersHistory.find((ticket) => ticket.id === id);
    const refundAmount = ticket.total;
    await fetch(`/api/user/mutateCredit`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        token: userToken,
      }),
      body: JSON.stringify({
        amount: refundAmount,
      }),
    }).then((res) => res.json());

    //update user profile
    setUserProfile({
      ...userProfile,
      credit: userProfile.credit + refundAmount,
    });

    //mutate local data
    const newUsersHistory = usersHistory.map((ticket) => {
      if (ticket.id === id) {
        return { ...ticket, status: "cancelled" };
      }
      return ticket;
    });

    showAlertMessage("Ticket Cancelled, your credit is refunded", "success");
    mutateUsersHistory(newUsersHistory);
  };

  return (
    <DashboardShell>
      <Head>
        <title>FlixHive - My Transaction History</title>
      </Head>
      <div className='bg-base-100 px-4 py-8 md:px-8 md:py-12 w-full min-h-[80vh]'>
        <h1 className='text-3xl font-bold mb-4'>My Transaction History </h1>
        <div className='w-full lg:w-fit'>
          <div className='shadow-md rounded-lg my-6'>
            <div className='shadow-md rounded my-6 overflow-x-auto'>
              <table className='table table-zebra table-auto min-w-fit'>
                <thead>
                  <tr>
                    <th className='font-bold text-sm md:text-lg'>Order ID</th>
                    <th className='font-bold text-sm md:text-lg'>Movie</th>
                    <th className='font-bold text-sm md:text-lg'>Seat</th>
                    <th className='font-bold text-sm md:text-lg'>Price</th>
                    <th className='font-bold text-sm md:text-lg text-center'>
                      {" Status "}
                    </th>
                    <th className='font-bold text-sm md:text-lg text-center'>
                      {" - "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!usersHistory || usersHistory.length === 0 ? (
                    <tr>
                      <td
                        colSpan='6'
                        className='text-center text-lg font-semibold'
                      >
                        No transaction history, yet.
                      </td>
                    </tr>
                  ) : (
                    usersHistory.map((ticket) => (
                      <TransactionCell
                        key={ticket.id}
                        ticket={ticket}
                        onCancel={handleCancel}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default UserTransaction;
