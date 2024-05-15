import { useState } from "react";
import "./App.css";
import { ArweaveWalletKit, ConnectButton } from "arweave-wallet-kit";

function App() {
  const [address, setAddress] = useState(
    "hY70z-mbKfDByqXh4y43ybSxReFVo1i9lB1dDdCkO_U"
  );
  const [amount, setAmount] = useState(0.001);
  const [name, setName] = useState("Community Labs");
  const [subscriptionName, setSubscriptionName] = useState("Premium Plan");
  const [subscriptionManagementUrl, setSubscriptionManagementUrl] = useState(
    "https://www.communitylabs.com/"
  );
  const [recurringFrequency, setRecurringFrequency] = useState("Hourly");

  const createSubscription = async () => {
    const testData = {
      arweaveAccountAddress: address,
      applicationName: name,
      subscriptionName,
      subscriptionManagementUrl,
      subscriptionFeeAmount: amount,
      recurringPaymentFrequency: recurringFrequency,
      subscriptionEndDate: "2024-12-31",
      applicationIcon: "https://www.verto.exchange/logo_light.svg",
    };

    // @ts-expect-error
    const data = await window.arweaveWallet.subscription(testData);
    return data;
  };

  return (
    <div>
      <ArweaveWalletKit
        config={{
          permissions: ["ACCESS_ADDRESS"],
          ensurePermissions: true,
        }}
      >
        <div>
          <ConnectButton />
        </div>

        <h1>Subscribe</h1>

        <div>
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Subscription Name:
            <input
              type="text"
              value={subscriptionName}
              onChange={(e) => setSubscriptionName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Subscription Management URL:
            <input
              type="text"
              value={subscriptionManagementUrl}
              onChange={(e) => setSubscriptionManagementUrl(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Recurring Frequency:
            <select
              value={recurringFrequency}
              onChange={(e) => setRecurringFrequency(e.target.value)}
            >
              <option value="Hourly">Hourly</option>
              <option value="5 minutes">5 minutes</option>
              <option value="Annually">Annually</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Daily">Daily</option>
            </select>
          </label>
        </div>
        <button onClick={createSubscription}>Subscribe</button>
      </ArweaveWalletKit>
    </div>
  );
}

export default App;
