
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Products = () => {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <div className="rounded-lg border bg-card text-card-foreground shadow">
        <div className="p-6">
          <p>Products management coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default Products;
