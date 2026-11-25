import React from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="app-footer">
      <div className="footer-content container">
        {/* GIỚI THIỆU */}
        <div className="footer-section about">
          <h2 className="logo-text">{t("footer.company_name")}</h2>

          <p>{t("footer.description")}</p>

          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>

            <a href="https://zalo.me" target="_blank" rel="noreferrer">
              Zalo
            </a>
          </div>
        </div>

        {/* LIÊN KẾT */}
        <div className="footer-section links">
          <h3>{t("footer.quick_links")}</h3>

          <ul>
            <li>
              <a href="/trang-chu">{t("header.home")}</a>
            </li>

            <li>
              <a href="/ve-chung-toi">{t("header.about")}</a>
            </li>

            <li>
              <a href="/linh-vuc">{t("header.services")}</a>
            </li>

            <li>
              <a href="/tin-tuc">{t("header.news")}</a>
            </li>

            <li>
              <a href="/lien-he">{t("header.contact")}</a>
            </li>
          </ul>
        </div>

        {/* THÔNG TIN LIÊN HỆ */}
        <div className="footer-section contact-form">
          <h3>{t("footer.contact_us")}</h3>

          <span>
            <strong>Tên công ty:</strong>
            <br />
            CÔNG TY CỔ PHẦN ĐẦU TƯ DYNAMIC & DEVELOPMENT
          </span>

          <span>
            <strong>MST:</strong> 0316777466
          </span>

          <span>
            <strong>Địa chỉ:</strong>
            <br />
            Tầng 2, T8-33 Vinhomes Grand Park, Đường Phước Thiện, Khu phố Phước
            Thiện, Phường Long Bình, TP Hồ Chí Minh, Việt Nam
          </span>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} {t("footer.company_name")} |{" "}
        {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
