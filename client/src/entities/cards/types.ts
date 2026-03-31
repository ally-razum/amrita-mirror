export interface Card {
  cardUser_Id: number;
  cardClientNumber: string;
  cardPhoto: string;
  cardFullName: string;
  cardPhone: string;
  cardBasicDiagnosis: string;
  cardHealthComplaints: string;
  cardDeliveryAddress: string;
  cardFinalDiagnosis: string | null;
  cardOilFromList: string | null;
  cardRecepi: string | null;
  card_IsChecked: boolean;
}
