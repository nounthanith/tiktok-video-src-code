import CategoryForm from "../components/CreateCate";
import { ICategory } from "../types/category.type";
import { getCategory } from "./category/action";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getCategory();

  return (
    <div className="p-2">
      <CategoryForm />

      <div className="space-y-2">
        {data.map((category: ICategory) => (
          <div className="border p-2" key={category._id}>
            <p className="text-2xl font-semibold">{category.name}</p>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}