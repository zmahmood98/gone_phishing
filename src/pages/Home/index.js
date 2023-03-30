import React, { useState, useEffect, useRef, Component } from 'react';
import axios from "axios";
import './index.css';

function Home () {
    const [show, setShow] = useState(false);
    const changeVisibility = () => {
        if (score==null) {
        setShow(!show);
        }
    };

    useEffect(()=> {
        if (score == null) {
        setDetails("Loading...");
        } else if (score <= 45) {
        console.log("low chance");
        setDetails(
            "It is not very likely that this link is part of a phishing scam."
        );
        } else if (score >= 60) {
        console.log("high chance");
        setDetails(
            "It is extremely likely that this link is part of a phishing scam."
        );
        } else {
        console.log("medium chance");
        setDetails(
            "We currently cannot evaluate accurately whether or not this link is part of a phishing scam."
        );
        }   
    })


    const handleSubmit = async (e) => {
      e.preventDefault();

      // Handle validations
     await axios
        .post("http://127.0.0.1:5000/score", { url: url })
        .then((response) => {
          
          // take score from the response - setScore to that
          setScore((response.data * 100).toFixed(2));
          console.log(score);
          console.log(typeof score);
        
        });

    };

    const [url, setUrl] = useState()
    const [score, setScore] = useState()
    const [details, setDetails] = useState()

    return (
      <>
        <section className="govuk-width-container">
          <div className="home-div">
            <h1 className="govuk-heading-l">URL Scan</h1>

            <p className="govuk-body-l">
              The following service will scan any URL inputted and produce a
              percentage score to inform you of how likely it is that the link
              is part of a phishing scam.{" "}
            </p>
          </div>

          <form class="input-div" method="post" onSubmit={handleSubmit}>
            <fieldset class="govuk-fieldset">
              <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
                <h1 class="govuk-fieldset__heading">What is your URL?</h1>
              </legend>
              <div class="govuk-form-group">
                <label class="govuk-label" for="address-line-1">
                  URL
                </label>
                <input
                  class="govuk-input"
                  id="address-line-1"
                  name="address-line-1"
                  type="text"
                  autocomplete="address-line1"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </fieldset>
            <button
              class="govuk-button"
              data-module="govuk-button"
              type="submit"
              onClick={changeVisibility}
            >
              Scan
            </button>
          </form>
        </section>
{show &&
        <section className="govuk-width-container hide-results">
          <h2 className="govuk-heading-m h2">Results</h2>
          <dl class="govuk-summary-list">
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">URL</dt>
              <dd class="govuk-summary-list__value">{url}</dd>
            </div>
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">Percentage Score</dt>
              <dd class="govuk-summary-list__value">{score}%</dd>
            </div>
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">Details</dt>
              <dd class="govuk-summary-list__value">
                <p class="govuk-body">{details}</p>
              </dd>
            </div>
          </dl>
        </section>
}
      </>
    );
}

export default Home;
