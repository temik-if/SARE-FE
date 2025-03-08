"use client";
import React, { useEffect, useState } from "react";
import styles from "./BookingForm.module.css";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import ShiftRadioGroup from "../ShiftRadioGroup/ShiftRadioGroup";
import SelectMenu from "../SelectMenu/SelectMenu";
import { bookingService } from "@/service/bookingService";
import { IBookingCreate } from "@/types/booking";
import { resourceService } from "@/service/resourceService";
import { IResource } from "@/types/resource";

const classes = ["1ª", "2ª", "3ª", "4ª", "5ª"];

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedShift, setSelectedShift] = useState("Matutino");
  const [selectedClasses, setSelectedClasses] = useState([
    "1ª",
    "2ª",
    "3ª",
    "4ª",
    "5ª",
  ]);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [availableResources, setAvailableResources] = useState<IResource[]>([]);

  const mapShift = (shift: string): "MORNING" | "AFTERNOON" | "EVENING" => {
    switch (shift) {
      case "Matutino":
        return "MORNING";
      case "Vespertino":
        return "AFTERNOON";
      case "Noturno":
        return "EVENING";
      default:
        return "MORNING"; // fallback padrão
    }
  };

  const fetchAvailableResources = async () => {
    if (!selectedDate) return;
    const dateStr = selectedDate.format("YYYY-MM-DD");

    const shiftStr = mapShift(selectedShift);

    const classArray = selectedClasses.map((item) =>
      parseInt(item.replace(/\D/g, ""))
    );
    console.log(classArray.join(","));
    try {
      const resources = await resourceService.getAvailable(
        dateStr,
        shiftStr,
        classArray.join(",")
      );
      setAvailableResources(resources);
    } catch (error) {
      console.error("Erro ao buscar recursos disponíveis", error);
      setAvailableResources([]);
    }
  };

  useEffect(() => {
    fetchAvailableResources();
  }, [selectedDate, selectedShift, selectedClasses]);

  const handleSubmit = async () => {
    const shift = mapShift(selectedShift);
    const date = selectedDate!.format("YYYY-MM-DD");
    const classArray = selectedClasses.map((item) =>
      parseInt(item.replace(/\D/g, ""))
    );

    for (const resourceName of selectedResources) {
      const resource = availableResources.find((r) => r.name === resourceName);
      if (!resource) {
        console.error(`Recurso ${resourceName} inválido selecionado`);
        return;
      }

      const bookingData: IBookingCreate = {
        resource_id: resource.id,
        shift,
        date,
        class: classArray,
      };

      try {
        const response = await bookingService.createBooking(bookingData);
        console.log(
          `Agendamento para ${resourceName} realizado com sucesso:`,
          response
        );
      } catch (error) {
        console.error(`Erro ao agendar ${resourceName}:`, error);
        return; 
      }
    }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        action="submit"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className={styles.formInner}>
          <div className={styles.formSection}>
            <div className={styles.datePickerContainer}>
              <h3>1 - Selecione uma data</h3>
              <DatePicker
                disablePast
                slotProps={{
                  textField: {
                    style: {
                      paddingLeft: "12px",
                      paddingRight: "12px",
                    },
                  },
                  openPickerIcon: {
                    style: {
                      color: "#EB7633",
                    },
                  },
                }}
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </div>
            <div>
              <h3>2 - Selecione um turno</h3>
              <div>
                <ShiftRadioGroup
                  selectedShift={selectedShift}
                  setSelectedShift={setSelectedShift}
                />
              </div>
            </div>
            <div>
              <h3>3 - Selecione a(s) aula(s)</h3>
              <SelectMenu
                label="Aula"
                items={classes}
                selectedItems={selectedClasses}
                setSelectedItems={setSelectedClasses}
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <div>
              <h3>4 - Selecione o(s) recurso(s)</h3>
              {selectedClasses.length === 0 ? (
                <div>
                  <h3 className={styles.infoMessage}>
                    Selecione pelo menos uma aula.
                  </h3>
                </div>
              ) : availableResources.length === 0 ? (
                <div>
                  <h3 className={styles.infoMessage}>
                    Não há recursos disponíveis para esta data e horário.
                  </h3>
                </div>
              ) : (
                <SelectMenu
                  label="Selecione"
                  items={availableResources.map((r) => r.name)}
                  selectedItems={selectedResources}
                  setSelectedItems={setSelectedResources}
                />
              )}
            </div>
          </div>
        </div>
        <ButtonPrimary
          isDisabled={
            !(selectedClasses.length > 0 && selectedResources.length > 0)
          }
          type="submit"
          label="REALIZAR AGENDAMENTO"
        />
      </form>
    </div>
  );
}
