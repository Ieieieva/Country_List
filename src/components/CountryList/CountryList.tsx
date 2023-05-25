import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "./CountryList.scss";
import { Loading } from "../Loading/Loading";
import { HasError } from "../Error/Error";

interface Country {
  name: string;
  capital: string;
  currency: string;
  code: string;
  emojiU: string;
  phone: string;
}

export const CountryList = () => {
  const [countryData, setCountryData] = useState<Country[]>([]);
  const [openedRow, setOpenedRow] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Country[]>("http://localhost:3000/countries")
      .then(({ data }) => {
        setLoading(false);
        setCountryData(data);
        setHasError(false);
      })
      .catch((err) => {
        setLoading(false);
        setHasError(true);
        console.log(err);
      });
  }, []);

  const handleClick = (code: string) => {
    if (openedRow === code) {
      setOpenedRow(null);
    } else {
      setOpenedRow(code);
    }
  };
  

  return (
    <section className="countrylist__container">
      {hasError && <HasError />}
      {loading && <Loading />}
      {!loading && !hasError && (
        <table className="countrylist">
          <thead>
            <tr>
              <th className="countrylist__header">Flag</th>
              <th className="countrylist__header">Country</th>
              <th className="countrylist__header">Code</th>
            </tr>
          </thead>
          <tbody>
            {countryData.map((country) => {
              return (
                <React.Fragment key={country.code}>
                  <tr
                    className="countrylist__row--visible"
                    onClick={() => handleClick(country.code)}
                  >
                    <td className="countrylist__flag">
                      <img
                        src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                        width="50"
                      />
                    </td>
                    <td className="countrylist__data--visible">
                      {country.name}
                    </td>
                    <td className="countrylist__data--visible country-code">
                      {country.code}
                    </td>
                  </tr>
                  {openedRow === country.code && (
                    <tr className="countrylist__row--invisible">
                      <td></td>
                      <td className="countrylist__data--invisible">
                        <div className="data__invisible">
                          <span>CAPITAL: </span>
                          <span>
                            <strong>{country.capital}</strong>
                          </span>
                        </div>
                        <div className="data__invisible">
                          <span>CURRENCY: </span>
                          <span>
                            <strong>{country.currency}</strong>
                          </span>
                        </div>
                        <div className="data__invisible">
                          <span>PHONE: </span>
                          <span>
                            <strong>{country.phone}</strong>
                          </span>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};
