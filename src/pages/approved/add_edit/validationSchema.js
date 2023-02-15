import * as Yup from "yup";
import axios from "axios";

const checkPayreqNumUniqueness = async (value) => {
  let isValid = true;

  // perform API call to check the uniqueness of the payreqNo
  const response = await axios.post(
    `http://localhost:8000/api/payreqs/check-unique?payreq_num=${value}`
  );

  // set isValid to false if the API returns false
  if (response.data) {
    isValid = false;
  }

  return isValid;
};

export const validationSchema = Yup.object().shape({
  employeeName: Yup.string().required("Employee Name is required"),
  payreqNo: Yup.string()
    .required("Payreq number is required")
    .test(
      "payreq-num-uniqueness",
      "Payreq number is already taken",
      checkPayreqNumUniqueness
    ),
  approvedDate: Yup.date().required("Approved date is required"),
  amount: Yup.number().required("Amount is required"),
  advanceCategory: Yup.string().required("Advance Category is required"),
});
