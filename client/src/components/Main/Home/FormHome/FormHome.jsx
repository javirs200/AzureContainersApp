import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormHome = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [cups, setCups] = useState("");

  const handleButtonClick = () => {

    if (!name || !address || !company) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    // Pasa el objeto a través del navigate.
    // navigate("/table", { state: { name, address, company, cups } });
  };

  return (
    <section className="form_logo_container">
      <h3 className="create_p">Empieza una nueva propuesta</h3>

      <article className="form_section">
        <form className="form_label">
          <input
            className="input_form"
            type="text"
            placeholder="Nombre/Razón"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            className="input_form"
            type="text"
            placeholder="Dirección"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
          <input
            className="input_form"
            type="text"
            placeholder="Empresa Eléctrica"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          ></input>
          <input
            className="input_form"
            type="text"
            placeholder="CUPS"
            name="cups"
            value={cups}
            onChange={(e) => setCups(e.target.value)}
          ></input>

          <button
            id="button_login"
            className="form_button"
            type="button"
            onClick={handleButtonClick}
          >
            Continuar
          </button>
        </form>
      </article>
    </section>
  );
};

export default FormHome;
