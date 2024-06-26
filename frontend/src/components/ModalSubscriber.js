import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeAction, getUserProfile } from "../actions/userActions";
import petimg from "../media/petForo.png";
import paypalLogo from "../media/paypal.png";
import visa from "../media/visa.png";
import american from "../media/american-express.png";

export default function ModalSubscriber({ onClose, blogBody }) {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const { profileInfo } = userProfile;
  console.log("profileInfo", profileInfo);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [email, setEmail] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cardDetails = { cardNumber, expiryDate, cvv };
    dispatch(subscribeAction(cardDetails)).then(() => {
      dispatch(userLogin(userInfo.email, userInfo.password)); // Actualizamos los datos del usuario después de que se suscribe
      onClose();
    });
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto ">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="flex m-5">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-3/4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Suscripción
              </h3>
              <div className="my-3 flex">
                <div className="relative mr-10 flex items-end">
                  <div className="flex flex-col">
                    <div className="flex ml-5">
                      <img
                        src={visa}
                        alt="Icono de Visa"
                        className="h-7 w-auto"
                      />
                      <img
                        src={american}
                        alt="Icono de American Express"
                        className="h-7 w-auto ml-2"
                      />
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        className="mr-2"
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="card" className="mr-5">
                        Tarjeta de débito o crédito
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative flex items-end">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={paypalLogo}
                      alt="Icono de PayPal"
                      className="h-9 w-auto"
                    />
                    <div className="flex items-center mt-2">
                      <input
                        className="mr-2"
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="paypal">Paypal</label>
                    </div>
                  </div>
                </div>
              </div>
              {paymentMethod === "card" ? (
                <form onSubmit={handleSubmit}>
                  <input
                    className="mt-2 mb-4 w-full border rounded p-2"
                    type="text"
                    placeholder="Nombre del titular"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    pattern="[a-zA-Z\s]+"
                    title="Por favor, introduce el nombre del titular de la tarjeta"
                    required
                  />
                  <input
                    className="mt-2 mb-4 w-full border rounded p-2"
                    type="text"
                    placeholder="Número de tarjeta"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    pattern="\d{16}"
                    title="Por favor, introduce un número de tarjeta válido de 16 dígitos"
                    required
                  />
                  <input
                    className="mt-2 mb-4 w-full border rounded p-2"
                    type="text"
                    placeholder="Fecha de vencimiento"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                    title="Por favor, introduce una fecha de vencimiento válida en el formato MM/AA"
                    required
                  />
                  <input
                    className="mt-2 mb-4 w-full border rounded p-2"
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    pattern="\d{3}"
                    title="Por favor, introduce un CVV válido de 3 dígitos"
                    required
                  />
                  <div className="mt-2 mb-4">
                    <input
                      type="checkbox"
                      id="terms"
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      required
                    />
                    <label htmlFor="terms" className="ml-2 text-xs">
                      Acepto los términos y condiciones
                    </label>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    className="mt-2 mb-4 w-full border rounded p-2"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </form>
              )}
              <button
                className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Suscribirse
              </button>
            </div>
            <div className="w-3/4 pl-4 flex flex-col justify-between p-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Acceso Premium</h2>
                <p className="mb-4">
                  Desbloquea el Universo del Conocimiento Científico
                </p>
                <ul className="list-disc list-inside mb-4">
                  <li>Publica tus opiniones</li>
                  <li>Comenta las publicaciones de los demas</li>
                  <li>Sin limitaciones de informacion</li>
                  <li>Visualizacion de hilos</li>
                </ul>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img src={petimg} alt="PetForo" className="h-[150px] " />
                <p className="text-2xl font-bold">$250 MXN / mes</p>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="absolute top-0 right-0 m-5 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
