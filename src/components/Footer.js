import React from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next"; // 1. Import hook

const Footer = () => {
  const { t } = useTranslation(); // 2. Lấy hàm t

  return (
    <footer className="app-footer">
      <div className="footer-content container">
        <div className="footer-section about">
          {/* 3. Sử dụng hàm t() */}
          <h2 className="logo-text">{t("footer.company_name")}</h2>
          <p>{t("footer.description")}</p>
          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://zalo.me" target="_blank" rel="noreferrer">
              Zalo
            </a>
            <a href="mailto:support@yourdomain.com">Email</a>
          </div>
        </div>
        <div className="footer-section links">
          <h3>{t("footer.quick_links")}</h3>
          <ul>
            {/* <li><a href="/san-giao-dich">{t('header.exchange')}</a></li> */}
            <li>
              <a href="/ve-chung-toi">{t("header.about")}</a>
            </li>
            <li>
              <a href="/tuyen-dung">{t("header.recruitment")}</a>
            </li>
            <li>
              <a href="/dieu-khoan">{t("footer.terms")}</a>
            </li>
            <li>
              <a href="/chinh-sach">{t("footer.privacy")}</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact-form">
          <h3>{t("footer.contact_us")}</h3>
          <span>
            <i className="fas fa-phone"></i> &nbsp; 123-456-789
          </span>
          <span>
            <i className="fas fa-envelope"></i> &nbsp; info@tencongty.com
          </span>
          <span>
            <i className="fas fa-map-marker-alt"></i> &nbsp; 123 Đường ABC, Quận
            1, TP.HCM
          </span>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} {t("footer.company_name")} |{" "}
        {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
