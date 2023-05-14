import { JSX } from "preact";
import { useState } from "preact/hooks";

enum Reason {
  none = "none",
  notAccurate = "not-accurate",
  missingInfo = "missing-info",
  tooComplicated = "too-complicated",
  incorrectExamples = "incorrect-examples",
  other = "other",
}

type onReasonSubmit = (reason: ReasonAnswer) => void;

type ReasonsFormProps = {
  sessionID: string;
  onSubmit: onReasonSubmit;
};

const ReasonsForm = ({ sessionID, onSubmit }: ReasonsFormProps) => {
  const [reason, setReason] = useState<Reason>(Reason.none);
  const [moreInfo, setMoreInfo] = useState("");
  const handleOnChangeReason = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    setReason(e.currentTarget.value as Reason);
  };

  const handleOnMoreInfoChange = (
    e: JSX.TargetedEvent<HTMLTextAreaElement>
  ) => {
    setMoreInfo(e.currentTarget.value);
  };

  const handleFormSubmit = (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ sessionID, reason, moreInfo });
  };

  return (
    <div>
      <h3>What is wrong with this page?</h3>
      <form onSubmit={handleFormSubmit}>
        <div style={`margin-bottom: 10px;`}>
          <div>
            <input
              onChange={handleOnChangeReason}
              type="radio"
              value={Reason.notAccurate}
              name="reasons"
            />
            <label>Does not accurately describe the product or feature.</label>
          </div>
          <div>
            <input
              onChange={handleOnChangeReason}
              type="radio"
              value={Reason.missingInfo}
              name="reasons"
            />
            <label>Missing important information.</label>
          </div>
          <div>
            <input
              onChange={handleOnChangeReason}
              type="radio"
              value={Reason.tooComplicated}
              name="reasons"
            />
            <label>Too complicated or unclear.</label>
          </div>
          <div>
            <input
              onChange={handleOnChangeReason}
              type="radio"
              value={Reason.incorrectExamples}
              name="reasons"
            />
            <label>One or more code samples are incorrect.</label>
          </div>
          <div>
            <input
              onChange={handleOnChangeReason}
              type="radio"
              value={Reason.other}
              name="reasons"
            />
            <label>Other reason.</label>
          </div>
          {reason && (
            <div>
              <h3>Anything else or more info?</h3>
              <textarea
                name="more"
                onChange={handleOnMoreInfoChange}
                width="200"
              />
            </div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReasonsForm;
