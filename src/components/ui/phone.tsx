"use client";

import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Flag } from "@/components/ui/flag";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { countryNames } from "@/lib/phone/countries";
import { cn } from "@/lib/utils";
import parsePhoneNumberFromString, {
  CountryCode,
  E164Number,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";

const codes: CountryCode[] = getCountries();

type PhoneProps = React.ComponentProps<"input"> & { value?: string };

function Phone({ value, onChange, ...props }: PhoneProps) {
  const countries = React.useMemo(
    () =>
      [...codes].sort((a, b) => {
        return countryNames[a].localeCompare(countryNames[b]);
      }),
    [],
  );

  const [country, setCountry] = React.useState<CountryCode>("US");
  const [number, setNumber] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleCountryChange = (newCountry: CountryCode) => {
    setCountry(newCountry);
    setOpen(false);
    const fullNumber = parsePhoneNumberFromString(number, newCountry);
    triggerOnChange(fullNumber?.number);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = e.target.value.replace(/[^0-9\-() ]/g, "");
    setNumber(filteredValue);
    const fullNumber = parsePhoneNumberFromString(filteredValue, country);
    triggerOnChange(fullNumber?.number);
  };

  const triggerOnChange = (newNumber: E164Number | undefined) => {
    if (!onChange || !inputRef.current) return;
    const syntheticEvent = {
      target: {
        ...inputRef.current,
        value: newNumber?.toString(),
      },
      currentTarget: inputRef.current,
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  const { name, className, ...groupProps } = props;

  return (
    <>
      <InputGroup className={cn(className)}>
        <InputGroupAddon align="inline-start" className="pl-1 my-0">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              aria-expanded={open}
              type="button"
              role="combobox"
              className="flex flex-row gap-1.5 h-8 items-center px-2 hover:bg-accent rounded-md cursor-pointer border-0 bg-transparent"
            >
              <Flag code={country} className="size-4" />
              <InputGroupText>+{getCountryCallingCode(country)}</InputGroupText>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search for a country..." />
                <CommandList className="mt-1">
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {countries.map((countryCode) => (
                      <CommandItem
                        key={countryCode}
                        value={`${countryNames[countryCode]} +${getCountryCallingCode(countryCode)}`}
                        onSelect={() => handleCountryChange(countryCode)}
                        className="cursor-pointer"
                      >
                        <span className="flex flex-row gap-1.5 h-5 items-center w-full">
                          <Flag code={countryCode} className="size-5" />
                          <span className="w-10 text-end">
                            +{getCountryCallingCode(countryCode)}
                          </span>
                          <span className="text-muted-foreground flex-1">
                            {countryNames[countryCode]}
                          </span>
                          {country === countryCode && (
                            <svg
                              className="ml-auto h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
        <InputGroupInput
          ref={inputRef}
          type="tel"
          value={number}
          onChange={handleInputChange}
          {...groupProps}
        />
      </InputGroup>
      {name && <input type="hidden" name={name} value={value} />}
    </>
  );
}

export { Phone };
