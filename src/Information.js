import "./Information.css";
import { useTranslation } from "react-i18next";

export const Information = () => {
  const { t } = useTranslation();

  return (
    <div className="infoContainer">
      <h2>{t("info.title")}</h2>
      <p className="subtitle">{t("info.subtitle")}</p>

      <div className="infoGrid">
        {/* STEP 1 */}
        <div className="infoCard">
          <h3>{t("info.step1.title")}</h3>
          <p>{t("info.step1.desc")} <strong>{t("info.step1.loopHighlight")}</strong> {t("info.step1.loopDesc")}</p>
          <ul className="codeList">
            <li><strong>1800s:</strong> {t("days.friday")} (5)</li>
            <li><strong>1900s:</strong> {t("days.wednesday")} (3)</li>
            <li><strong>2000s:</strong> {t("days.tuesday")} (2)</li>
            <li><strong>2100s:</strong> {t("days.sunday")} (0)</li>
          </ul>
        </div>

        {/* STEP 2 */}
        <div className="infoCard">
          <h3>{t("info.step2.title")}</h3>
          <p>{t("info.step2.desc")}</p>
          
          <div className="methodBox">
            <h4>{t("info.step2.methodA.name")}</h4>
            <div className="formula">{t("info.step2.methodA.formula")}</div>
            <p className="smallText">{t("info.step2.methodA.desc")}</p>
          </div>

          <div className="methodBox">
            <h4>{t("info.step2.methodB.name")}</h4>
            <ol className="stepList">
              <li>{t("info.step2.methodB.s1")} <strong>11</strong>.</li>
              <li>{t("info.step2.methodB.s2")} <strong>2</strong>. {t("info.step2.methodB.s2b")} <strong>11</strong> {t("info.step2.methodB.s2c")}.</li>
              <li>{t("info.step2.methodB.s3")} <strong>{t("info.step2.methodB.mod7")}</strong>.</li>
              <li>{t("info.step2.methodB.s4")} <strong>{t("info.step2.methodB.multiple7")}</strong>.</li>
            </ol>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="infoCard">
          <h3>{t("info.step3.title")}</h3>
          <p>{t("info.step3.desc")}</p>
          
          <div className="mnemonicSection">
            <p><strong>{t("info.step3.mnem1.label")}</strong> {t("info.step3.mnem1.val")}</p>
            <p><strong>{t("info.step3.mnem2.label")}</strong> {t("info.step3.mnem2.val")}</p>
            <p><strong>{t("info.step3.mnem3.label")}</strong> {t("info.step3.mnem3.val")}</p>
            <p><strong>{t("info.step3.mnem4.label")}</strong> {t("info.step3.mnem4.val")}</p>
          </div>

          <div className="anchorGrid">
            <div><strong>{t("months.jan")}:</strong> 3/4*</div><div><strong>{t("months.feb")}:</strong> 28/29*</div>
            <div><strong>{t("months.mar")}:</strong> 14</div><div><strong>{t("months.apr")}:</strong> 4</div>
            <div><strong>{t("months.may")}:</strong> 9</div><div><strong>{t("months.jun")}:</strong> 6</div>
            <div><strong>{t("months.jul")}:</strong> 11</div><div><strong>{t("months.aug")}:</strong> 8</div>
            <div><strong>{t("months.sep")}:</strong> 5</div><div><strong>{t("months.oct")}:</strong> 10</div>
            <div><strong>{t("months.nov")}:</strong> 7</div><div><strong>{t("months.dec")}:</strong> 12</div>
          </div>
        </div>

        {/* STEP 4: EXAMPLE */}
        <div className="infoCard exampleCard">
          <h3>{t("info.example.title")}</h3>
          
          <div className="walkthrough">
            <div className="walkthroughStep">
              <span className="stepNum">1</span>
              <p><strong>{t("info.example.s1.label")}</strong> {t("info.example.s1.desc")} <strong>{t("days.wednesday")} (3)</strong>.</p>
            </div>

            <div className="walkthroughStep">
              <span className="stepNum">2</span>
              <div>
                <p><strong>{t("info.example.s2.label")}</strong> {t("info.example.s2.desc")}</p>
                <ul className="exampleChoice">
                  <li><strong>{t("info.example.s2.mA.label")}</strong> {t("info.example.s2.mA.val")} <strong>2</strong>.</li>
                  <li><strong>{t("info.example.s2.mB.label")}</strong> {t("info.example.s2.mB.val")} <strong>2</strong>.</li>
                </ul>
              </div>
            </div>

            <div className="walkthroughStep">
              <span className="stepNum">3</span>
              <p><strong>{t("info.example.s3.label")}</strong> {t("info.example.s3.desc")} <strong>5</strong>. {t("info.example.s3.result")} <strong>{t("days.friday") + (t("days.friday").at(-1) !== 's' ? 's' : '')}</strong>.</p>
            </div>

            <div className="walkthroughStep">
              <span className="stepNum">4</span>
              <p><strong>{t("info.example.s4.label")}</strong> {t("info.example.s4.desc")} <strong>{t("months.jul")} 11</strong>. {t("info.example.s4.diff")} <strong>+9 {t("info.example.s4.days")}</strong>. {t("info.example.s4.mod")} <strong>2 {t("info.example.s4.days")}</strong> {t("info.example.s4.past")}.</p>
            </div>

            <div className="walkthroughStep final">
              <p><strong>{t("info.example.final.label")}</strong> {t("days.friday")} + 2 {t("info.example.s4.days")} = <strong>{t("days.sunday")}</strong>. {t("info.example.final.event")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};