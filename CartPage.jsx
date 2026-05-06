import React, { useState, useContext, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { jsPDF } from "jspdf";
import { CartContext } from "../App"; // ✅ Import Cart Context

// 🎨 Styled Components
const CartContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: #fafafa;
  min-height: 100vh;
  position: relative;
  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }
`;

const CartContent = styled.div`
  background: #fff;
  border-radius: 8px;
  flex: 1;
  max-width: 800px;
  margin-right: 32px;
  box-shadow: 0 2px 10px rgba(50,54,72,0.07);
  padding: 36px 36px 12px 36px;
  filter: ${props => (props.disabled ? 'blur(2px)' : 'none')};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  @media (max-width: 992px) {
    margin-right: 0;
    margin-bottom: 24px;
    max-width: 95%;
  }

  @media (max-width: 576px) {
    padding: 24px;
  }
`;

const SummarySection = styled.div`
  min-width: 320px;
  max-width: 350px;
  background: #fafafa;
  border-left: 1px solid #e7e7e7;
  padding: 36px;
  filter: ${props => (props.disabled ? 'blur(2px)' : 'none')};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  @media (max-width: 992px) {
    min-width: unset;
    max-width: 95%;
    border-left: none;
    border-top: 1px solid #e7e7e7;
    padding: 24px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  margin-bottom: 32px;
  @media (max-width: 576px) {
    font-size: 1.5rem;
    margin-bottom: 24px;
  }
`;

const TableHeader = styled.div`
  display: flex;
  font-size: 0.95rem;
  letter-spacing: 1px;
  color: #868686;
  border-bottom: 2px solid #e7e7e7;
  padding-bottom: 8px;
  margin-bottom: 24px;
  @media (max-width: 576px) {
    display: none;
  }
`;

const fade = keyframes`
  0% { background: #ffe08a; }
  100% { background: transparent; }
`;

const Product = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #ededed;
  padding: 20px 0;
  min-height: 120px;
  animation: ${props => props.animate ? fade : "none"} 0.5s linear;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ProductImage = styled.img`
  height: 84px;
  width: 84px;
  border-radius: 7px;
  object-fit: cover;
  border: 1px solid #eee;
`;

const ProductDetails = styled.div`
  flex: 3;
  margin-left: 20px;
  @media (max-width: 576px) {
    margin-left: 0;
    margin-top: 15px;
    flex: unset;
  }
`;

const ProductTitle = styled.div`
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 1.07rem;
  margin-bottom: 3px;
`;

const ProductMeta = styled.div`
  color: #969696;
  font-size: 0.92rem;
  margin-bottom: 7px;
`;

const QuantityControl = styled.div`
  margin: 5px 0 0 0;
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 1rem;
  span {
    padding: 3px 9px;
    background: #f3f3f3;
    border: 1px solid #dedede;
    border-radius: 2px;
    cursor: pointer;
    font-weight: 600;
    user-select: none;
    &:active { background: #e5e5e5; }
    transition: background 0.18s;
  }
    @media (max-width: 576px) {
    justify-content: center;
  }
`;

const RemoveButton = styled.span`
  color: #dc3545;
  margin-top: 9px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.98rem;
  letter-spacing: 1px;
  &:hover { text-decoration: underline; }
  @media (max-width: 576px) {
    display: block;
    margin-top: 12px;
    text-align: center;
  }
`;

const Price = styled.div`
  flex: 1;
  font-size: 1rem;
  text-align: right;
  @media (max-width: 576px) {
    text-align: center;
    margin-top: 10px;
  }
`;

const Total = styled.div`
  flex: 1;
  font-size: 1rem;
  text-align: right;
  @media (max-width: 576px) {
    text-align: center;
    margin-top: 10px;
  }
`;

const SummaryTitle = styled.h3`
  font-weight: 700;
  margin-bottom: 18px;
  letter-spacing: 1px;
  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`;

const PromoInput = styled.input`
  width: 100%;
  padding: 11px 10px;
  border: 1px solid #d7d7d7;
  border-radius: 3px;
  margin-bottom: 17px;
  margin-right: 10px;
  font-size: 1rem;
`;

const ApplyButton = styled.button`
  padding: 10px 22px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 19px;
`;

const SummaryList = styled.div`
  margin-top: 15px;
  color: #343434;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 9px;
  letter-spacing: 1px;
  font-size: 1rem;
`;

const EstTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.18rem;
  font-weight: 700;
  border-top: 1.5px solid #dedede;
  padding-top: 14px;
  margin-top: 18px;
  @media (max-width: 576px) {
    font-size: 1.05rem;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  margin-top: 30px;
  padding: 15px 0;
  background: #181818;
  color: #fff;
  font-size: 1.08rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  letter-spacing: 1.2px;
  cursor: pointer;
  transition: background 0.18s;
  &:hover { background: #262626; }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const HelpText = styled.div`
  margin-top: 32px;
  color: #7c7c7c;
  font-size: 0.97rem;
  letter-spacing: 0.5px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ThankYouMessage = styled.div`
  background: white;
  border-radius: 10px;
  padding: 60px 40px;
  font-size: 1.8rem;
  font-weight: 700;
  box-shadow: 0 8px 24px rgb(0 0 0 / 25%);
  text-align: center;
   @media (max-width: 576px) {
    font-size: 1.4rem;
    padding: 40px 20px;
  }
`;
const SHIPPING = 35;
const TAX = 45;

const CartPage = () => {
  const { cart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [animateIdx, setAnimateIdx] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showPromoPopup, setShowPromoPopup] = useState(false);

  // Sync cart context
  useEffect(() => {
    setProducts(cart);
  }, [cart]);

  const handleQuantity = (idx, diff) => {
    setProducts(products =>
      products.map((prod, i) =>
        i === idx ? { ...prod, quantity: Math.max(1, prod.quantity + diff) } : prod
      )
    );
  };

  const handleRemove = idx => {
    const removed = products.filter((_, i) => i !== idx);
    setProducts(removed);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === "apsit") {
      setDiscount(0.2); // ✅ 20% discount
      setShowPromoPopup(true);
      setTimeout(() => setShowPromoPopup(false), 2500);
    } else {
      alert("Invalid promo code");
    }
  };

  const handleCheckout = () => {
    setShowThankYou(true);
  };

  // 💰 Calculations
  const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const discountedSubtotal = subtotal * (1 - discount);
  const estimatedTotal = discountedSubtotal + SHIPPING + TAX;

  // 🧾 Download invoice as PDF
const downloadInvoice = () => {
  const doc = new jsPDF();

  // === HEADER ===
  doc.setFillColor(235, 192, 118); // Roomify's golden-beige tone
  doc.rect(0, 0, 210, 30, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(60, 60, 60);
  doc.text("Room", 14, 20);
  doc.setTextColor(30, 30, 30);
  doc.text("ify", 41, 20);

  // === SUBHEADER ===
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 150, 20, { align: "right" });
  doc.text(`Invoice ID: RMF-${Math.floor(Math.random() * 90000 + 10000)}`, 150, 27, { align: "right" });

  // === SECTION TITLE ===
  let y = 40;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(33, 33, 33);
  doc.text("Order Summary", 14, y);

  y += 6;
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(14, y, 196, y);

  // === ITEM DETAILS ===
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  products.forEach((p, i) => {
    doc.text(`${i + 1}. ${p.name}`, 14, y);
    doc.text(`x${p.quantity}`, 120, y);
    doc.text(`$${(p.price * p.quantity).toFixed(2)}`, 190, y, { align: "right" });
    y += 8;
  });

  // === SEPARATOR LINE ===
  y += 4;
  doc.setDrawColor(180, 180, 180);
  doc.line(14, y, 196, y);
  y += 10;

  // === PRICE BREAKDOWN ===
  doc.setFont("helvetica", "bold");
  doc.text("Subtotal:", 140, y);
  doc.setFont("helvetica", "normal");
  doc.text(`$${subtotal.toFixed(2)}`, 190, y, { align: "right" });
  y += 8;

  if (discount > 0) {
    doc.setFont("helvetica", "bold");
    doc.text("Discount (20%):", 140, y);
    doc.setFont("helvetica", "normal");
    doc.text(`-$${(subtotal * 0.2).toFixed(2)}`, 190, y, { align: "right" });
    y += 8;
  }

  doc.setFont("helvetica", "bold");
  doc.text("Shipping:", 140, y);
  doc.setFont("helvetica", "normal");
  doc.text(`$${SHIPPING.toFixed(2)}`, 190, y, { align: "right" });
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.text("Tax:", 140, y);
  doc.setFont("helvetica", "normal");
  doc.text(`$${TAX.toFixed(2)}`, 190, y, { align: "right" });
  y += 10;

  // === TOTAL AMOUNT BOX ===
  doc.setFillColor(240, 240, 240);
  doc.rect(130, y, 65, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Total:", 140, y + 7);
  doc.text(`$${estimatedTotal.toFixed(2)}`, 190, y + 7, { align: "right" });

  // === FOOTER ===
  y += 30;
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.text("Thank you for choosing Roomify!", 105, y, { align: "center" });
  y += 6;
  doc.text("Transform your space with confidence.", 105, y, { align: "center" });

  // === SAVE ===
  doc.save("Roomify_Invoice.pdf");
};

  return (
    <CartContainer>
      <CartContent disabled={showThankYou}>
        <Title>MY SHOPPING BAG</Title>
        <TableHeader>
          <div style={{ flex: 3 }}>PRODUCT</div>
          <Price>PRICE</Price>
          <Total>TOTAL</Total>
        </TableHeader>

        {products.length > 0 ? (
          products.map((p, idx) => (
            <Product key={p.id} animate={animateIdx === idx}>
              <ProductImage src={p.image} alt={p.name} />
              <ProductDetails>
                <ProductTitle>{p.name}</ProductTitle>
                <QuantityControl>
                  <span onClick={() => handleQuantity(idx, -1)}>-</span>
                  {p.quantity}
                  <span onClick={() => handleQuantity(idx, 1)}>+</span>
                </QuantityControl>
                <RemoveButton onClick={() => handleRemove(idx)}>Remove</RemoveButton>
              </ProductDetails>
              <Price>${p.price.toFixed(2)}</Price>
              <Total>${(p.price * p.quantity).toFixed(2)}</Total>
            </Product>
          ))
        ) : (
          <div style={{ padding: "36px 0", textAlign: "center", color: "#888" }}>
            Your shopping bag is empty.
          </div>
        )}
      </CartContent>

      <SummarySection disabled={showThankYou}>
        <SummaryTitle>SUMMARY</SummaryTitle>
        <PromoInput
          placeholder="Do you have a promo code?"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <ApplyButton onClick={handleApplyPromo}>APPLY</ApplyButton>

        <SummaryList>
          <SummaryItem><span>SUBTOTAL</span><span>${subtotal.toFixed(2)}</span></SummaryItem>
          {discount > 0 && (
            <SummaryItem><span>Discount (20%)</span><span>- ${(subtotal * 0.2).toFixed(2)}</span></SummaryItem>
          )}
          <SummaryItem><span>Shipping</span><span>${SHIPPING.toFixed(2)}</span></SummaryItem>
          <SummaryItem><span>Sales Tax</span><span>${TAX.toFixed(2)}</span></SummaryItem>
          <EstTotal>
            <span>ESTIMATED TOTAL</span>
            <span>${estimatedTotal.toFixed(2)}</span>
          </EstTotal>
        </SummaryList>

        <CheckoutButton disabled={products.length === 0} onClick={handleCheckout}>
          CHECKOUT
        </CheckoutButton>
        <HelpText>Need help? Call us at 1-877-707-6272</HelpText>
      </SummarySection>

      {/* ✅ Promo Popup */}
      {showPromoPopup && (
        <Overlay>
          <ThankYouMessage style={{ fontSize: "1.4rem" }}>
            Promo code applied! 🎉<br />You got 20% discount.
          </ThankYouMessage>
        </Overlay>
      )}

      {/* ✅ Invoice Popup */}
      {showThankYou && (
        <Overlay>
          <ThankYouMessage>
            <div>🧾 Order Confirmed!</div>
            <div style={{ fontSize: "1.2rem", marginTop: "15px" }}>
              Your total: ${estimatedTotal.toFixed(2)}
            </div>

            <div style={{ marginTop: "28px", display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                onClick={downloadInvoice}
                style={{
                  padding: "11px 30px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#007bff",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  letterSpacing: "1px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.13)"
                }}
              >
                Download Invoice
              </button>

              <button
                onClick={() => setShowThankYou(false)}
                style={{
                  padding: "11px 30px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#181818",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  letterSpacing: "1px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.13)"
                }}
              >
                Close
              </button>
            </div>
          </ThankYouMessage>
        </Overlay>
      )}
    </CartContainer>
  );
};

export default CartPage;