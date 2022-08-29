import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { useCurrencyConverter } from "../../hooks/useCurrencyConverter";
import { currencyAtom } from "../../store/CurrencyAtom";
import { PurchaseType } from "../../utils/purchaseUtils";
import { Button } from "../Button/Button";

const Form = styled.form`
  max-width: 360px;
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  div + div {
    margin-bottom: 32px;
  }
`;

const BranchInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1rem;
  line-height: 21px;
  height: 78px;
  justify-content: space-between;
`;

const BranchInput = styled.input`
  background: #fff;
  border: 1px solid #d7e0eb;
  border-radius: 4px;
  padding: 16px;
  width: 130px;
  height: 15px;
  filter: drop-shadow(0px 8px 4px rgba(13, 17, 27, 0.08));
  font-family: "Roboto", sans-serif;
`;

const FormRadioGroup = styled.div`
  padding: 10px 0 32px 0;
  display: flex;
  align-items: center;
  align-content: center;
  font-family: "CircularStd";
  font-size: 16px;
  line-height: 24px;
`;

const RadioInputGroup = styled.div`
  display: flex;
  align-items: stretch;
  width: 100px;
`;

const RadioInput = styled.input`
  height: 1rem;
  width: 1rem;
  margin-right: 0.5rem;
  -webkit-appearance: none;
  border-radius: 50%;
  outline: none;
  box-shadow: 0 0 0 2px gray;
  cursor: pointer;

  &:checked {
    box-shadow: 0 0 0 2px green;
  }

  &::before {
    content: "";
    display: block;
    width: 60%;
    height: 60%;
    margin: 20% auto;
    border-radius: 50%;
  }

  &:checked::before {
    background: #008b57;
  }
`;

const PurchaseTypeLabel = styled.span`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.313rem;
`;

type FormData = {
  dollarQuantity: string;
  stateTaxes: string;
  purchaseType: PurchaseType;
  formattedValues: {
    dollarQuantity: string;
    stateTaxes: string;
  };
};

export function CurrencyExchangeForm() {
  const [_, setCurrencyAtomValue] = useAtom(currencyAtom);

  const { getDollarConversionTotal, isLoading } = useCurrencyConverter();

  const router = useRouter();

  const { register, handleSubmit, control, formState, setValue, getValues } =
    useForm<FormData>({
      defaultValues: {
        dollarQuantity: "1.00",
        stateTaxes: "",
        purchaseType: "cash",
        formattedValues: {
          stateTaxes: "",
          dollarQuantity: "1,00",
        },
      },
    });

  const onSubmit = handleSubmit(
    ({ dollarQuantity, purchaseType, stateTaxes }) => {
      const total = getDollarConversionTotal({
        dollarQuantity: Number(dollarQuantity),
        purchaseType,
        stateTaxes: Number(stateTaxes),
      });

      setCurrencyAtomValue({
        dollarConversionTotal: total,
        purchaseType,
        stateTaxes: stateTaxes,
      });

      router.push("/result");
    }
  );

  const isSubmitButtonDisabled = () =>
    isLoading || !formState.dirtyFields.stateTaxes;

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <BranchInputGroup>
          <label htmlFor="dollarQuantity">Dólar</label>
          <Controller
            control={control}
            name="dollarQuantity"
            render={({ field: { onChange, onBlur, value, ref, name } }) => (
              <NumberFormat
                onBlur={onBlur}
                onValueChange={({ formattedValue, value }) => {
                  onChange(value);
                  setValue("formattedValues.dollarQuantity", formattedValue);
                }}
                value={getValues("formattedValues.dollarQuantity")}
                ref={ref}
                name={name}
                id="dollarQuantity"
                thousandSeparator="."
                decimalSeparator=","
                customInput={BranchInput}
                prefix="$ "
                data-testid="dollar-quantity"
              />
            )}
          />
        </BranchInputGroup>
        <BranchInputGroup>
          <label htmlFor="stateTaxes">Taxa do Estado</label>
          <Controller
            control={control}
            name="stateTaxes"
            render={({ field: { onChange, onBlur, value, ref, name } }) => (
              <NumberFormat
                onBlur={onBlur}
                onValueChange={({ formattedValue, value }) => {
                  onChange(value);
                  setValue("formattedValues.stateTaxes", formattedValue);
                }}
                value={getValues("formattedValues.stateTaxes")}
                ref={ref}
                name={name}
                id="stateTaxes"
                data-testid="state-taxes"
                decimalSeparator="."
                customInput={BranchInput}
                suffix=" %"
                placeholder="0 %"
              />
            )}
          />
        </BranchInputGroup>
      </FormGroup>
      <PurchaseTypeLabel>Tipo de Compra</PurchaseTypeLabel>
      <div>
        <FormRadioGroup>
          <RadioInputGroup>
            <RadioInput
              type="radio"
              id="Cash"
              value="cash"
              data-testid="cash"
              {...register("purchaseType")}
            />
            <label htmlFor="Cash">Dinheiro</label>
          </RadioInputGroup>
          <RadioInputGroup>
            <RadioInput
              type="radio"
              id="card"
              data-testid="card"
              value="card"
              {...register("purchaseType")}
            />
            <label htmlFor="card">Cartão</label>
          </RadioInputGroup>
        </FormRadioGroup>
      </div>
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitButtonDisabled()}
      >
        {<Image src="/assets/transfer.svg" width={20} height={20} alt="" />}{" "}
        Converter
      </Button>
    </Form>
  );
}
