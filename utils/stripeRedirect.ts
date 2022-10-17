import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

export const redirectToCheckout = async (id: string) => {
  const stripe = await loadStripe(
    "pk_test_51IpCBhIujyIA1co1uDkBkttR6vez94kGCTZ4NVSVccUKE3t2Y5dhbza8egjFENB03ztE1VFQxq54zzfaOeDbhUIH00bbVjeNsA"
  );
  return stripe!.redirectToCheckout({
    sessionId: id,
  });
};
