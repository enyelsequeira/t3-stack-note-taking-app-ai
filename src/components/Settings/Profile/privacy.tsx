import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";

const PrivacyProfile = () => {
  const [availableToHire, setAvailableToHire] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [allowCommenting, setAllowCommenting] = useState(true);
  const [allowMentions, setAllowMentions] = useState(true);
  return (
    <div className="divide-y divide-gray-200 pt-6">
      <div className="px-4 sm:px-6">
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Privacy
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
          </p>
        </div>
        <ul role="list" className="mt-2 divide-y divide-gray-200">
          <Switch.Group
            as="li"
            className="flex items-center justify-between py-4"
          >
            <div className="flex flex-col">
              <Switch.Label
                as="p"
                className="text-sm font-medium text-gray-900"
                passive
              >
                Available to hire
              </Switch.Label>
              <Switch.Description className="text-sm text-gray-500">
                Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
              </Switch.Description>
            </div>
            <Switch
              checked={availableToHire}
              onChange={setAvailableToHire}
              className={clsx(
                availableToHire ? "bg-teal-500" : "bg-gray-200",
                "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  availableToHire ? "translate-x-5" : "translate-x-0",
                  "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          </Switch.Group>
          <Switch.Group
            as="li"
            className="flex items-center justify-between py-4"
          >
            <div className="flex flex-col">
              <Switch.Label
                as="p"
                className="text-sm font-medium text-gray-900"
                passive
              >
                Make account private
              </Switch.Label>
              <Switch.Description className="text-sm text-gray-500">
                Pharetra morbi dui mi mattis tellus sollicitudin cursus
                pharetra.
              </Switch.Description>
            </div>
            <Switch
              checked={privateAccount}
              onChange={setPrivateAccount}
              className={clsx(
                privateAccount ? "bg-teal-500" : "bg-gray-200",
                "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  privateAccount ? "translate-x-5" : "translate-x-0",
                  "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          </Switch.Group>
          <Switch.Group
            as="li"
            className="flex items-center justify-between py-4"
          >
            <div className="flex flex-col">
              <Switch.Label
                as="p"
                className="text-sm font-medium text-gray-900"
                passive
              >
                Allow commenting
              </Switch.Label>
              <Switch.Description className="text-sm text-gray-500">
                Integer amet, nunc hendrerit adipiscing nam. Elementum ame
              </Switch.Description>
            </div>
            <Switch
              checked={allowCommenting}
              onChange={setAllowCommenting}
              className={clsx(
                allowCommenting ? "bg-teal-500" : "bg-gray-200",
                "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  allowCommenting ? "translate-x-5" : "translate-x-0",
                  "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          </Switch.Group>
          <Switch.Group
            as="li"
            className="flex items-center justify-between py-4"
          >
            <div className="flex flex-col">
              <Switch.Label
                as="p"
                className="text-sm font-medium text-gray-900"
                passive
              >
                Allow mentions
              </Switch.Label>
              <Switch.Description className="text-sm text-gray-500">
                Adipiscing est venenatis enim molestie commodo eu gravid
              </Switch.Description>
            </div>
            <Switch
              checked={allowMentions}
              onChange={setAllowMentions}
              className={clsx(
                allowMentions ? "bg-teal-500" : "bg-gray-200",
                "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  allowMentions ? "translate-x-5" : "translate-x-0",
                  "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          </Switch.Group>
        </ul>
      </div>
    </div>
  );
};
export default PrivacyProfile;
