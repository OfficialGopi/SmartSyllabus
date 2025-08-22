import { useEffect, useState } from "react";
import { transactionAPI } from "@/services/api";

const Transactions = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await transactionAPI.getAll();
        setItems(res.data.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Transactions</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="border rounded-lg divide-y">
          {items.map((t) => (
            <div key={t._id} className="p-4 flex justify-between">
              <div>
                <div className="font-medium">{t.paymentProvider}</div>
                <div className="text-sm text-neutral-600">
                  {new Date(t.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">+{t.creditsAdded} credits</div>
                <div className="text-sm">${t.amount}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
