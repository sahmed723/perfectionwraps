import CustomerList from "@/components/shop/CustomerList";
import { EmptyState } from "@/components/shop/primitives";
import { Users } from "lucide-react";

export default function CustomersPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1500px] mx-auto w-full">
      <div className="lg:col-span-5">
        <CustomerList />
      </div>
      <div className="lg:col-span-7 hidden lg:block">
        <EmptyState
          icon={<Users size={32} strokeWidth={1.2} />}
          title="Pick a customer"
          hint="Their full vehicle garage, job history, communication thread, and notes will land here."
        />
      </div>
    </div>
  );
}
