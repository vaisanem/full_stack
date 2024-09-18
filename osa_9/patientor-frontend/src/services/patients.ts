import axios from "axios";
import { Patient, PatientFormValues, NewEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (id: string, values: NewEntry) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${id}/entries`,
    values
  );

  return data;
};

export default {
  getAll, getPatient, create, addEntry
};

