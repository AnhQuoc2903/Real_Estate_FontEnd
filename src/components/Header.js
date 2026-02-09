import React, { useState } from "react";
import "./Header.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <img src="/DD-1.png" alt="Logo" width={30} />
        </div>

        {/* Nút menu trên mobile */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Menu chính */}
        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/trang-chu">{t("header.home")}</Link>
            </li>
            <li>
              <Link to="/ve-chung-toi">{t("header.about")}</Link>
            </li>
            <li>
              <Link to="/linh-vuc">{t("header.services")}</Link>
            </li>
            <li>
              <Link to="/tin-tuc">{t("header.news")}</Link>
            </li>
            <li>
              <Link to="/tuyen-dung">{t("header.recruitment")}</Link>
            </li>
            <li>
              <Link to="/lien-he">{t("header.contact")}</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
