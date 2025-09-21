import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetailPage() {
  const [vegetable, setVegetable] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id, addToCart } = useParams();

  useEffect(() => {
    const fetchVegetable = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/vegetables/${id}`);
        setVegetable(response.data.data);
      } catch (error) {
        console.log("Failed to get vegetable with id requested: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVegetable();
  }, [id]);

  if (loading) {
    return <div>Loading the requested vegetable....</div>;
  }
  if (!vegetable) {
    return <div>Vegetable not found!</div>;
  }

  return (
    <>
      <div>
        <img src={vegetable.imageUrl} alt={vegetable.name} />
        {vegetable.name} - ${vegetable.price}
        <label>Quantity:</label>
        <input type="number" />
        <button
          onClick={() => {
            addToCart();
          }}
        >
          Add To Cart
        </button>
      </div>
    </>
  );
}

export default ProductDetailPage;
