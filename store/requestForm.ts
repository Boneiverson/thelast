import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersonalDetails {
  idImage?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  maritalStatus?: string;
  employmentStatus?: string;
}

interface Guarantor {
  name: string;
  contact: string;
}

interface AccountDetails {
  mobileMoneyNumber?: string;
  holderName?: string;
  walletProvider?: string;
}

interface RequestFormState {
  personalDetails: PersonalDetails;
  guarantors: Guarantor[];
  accountDetails: AccountDetails;
}

const initialState: RequestFormState = {
  personalDetails: {},
  guarantors: [],
  accountDetails: {},
};

const requestFormSlice = createSlice({
  name: 'requestForm',
  initialState,
  reducers: {
    setPersonalDetails(state: { personalDetails: any; }, action: PayloadAction<Partial<PersonalDetails>>) {
      state.personalDetails = { ...state.personalDetails, ...action.payload };
    },
    setGuarantors(state: { guarantors: any; }, action: PayloadAction<Guarantor[]>) {
      state.guarantors = action.payload;
    },
    setAccountDetails(state: { accountDetails: any; }, action: PayloadAction<Partial<AccountDetails>>) {
      state.accountDetails = { ...state.accountDetails, ...action.payload };
    },
  },
});

export const { setPersonalDetails, setGuarantors, setAccountDetails } = requestFormSlice.actions;
export default requestFormSlice.reducer;