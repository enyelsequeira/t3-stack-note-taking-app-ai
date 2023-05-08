import type { Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";

type Props = {
  onChange: (e: string) => void;
  countries: string[];
  selectedCountry: string | undefined;
  setSelectedCountry: Dispatch<SetStateAction<string | undefined>>;
};

const CountrySelect = ({ countries, selectedCountry, onChange }: Props) => {
  return (
    <div className="col-span-12 sm:col-span-6">
      <label className=" text-sm font-medium text-gray-700">
        Select Country
      </label>
      <Listbox value={selectedCountry} onChange={onChange}>
        <div className="relative ">
          <Listbox.Button className="focus-ring-0 relative w-full rounded-md border border-gray-300 py-2 px-3  shadow-sm outline-none ring-0 focus:border-sky-500 focus:outline-none sm:text-sm ">
            <span className="block truncate">{selectedCountry}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <IconChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-20 mt-1 max-h-36 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {countries.map((country, countryIdx) => (
                <Listbox.Option
                  key={countryIdx}
                  className={({ active }) =>
                    `relative  cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={country}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {country}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <IconCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CountrySelect;
