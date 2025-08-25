import { Subcategory } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/subcategories`;

const getSubcategory = async (id: string): Promise<Subcategory[]> => {
    const res = await fetch(`${URL}/${id}`);

    return res.json();
}

export default getSubcategory;