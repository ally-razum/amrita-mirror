export interface Card {
  id: number;
  cardPhoto: string;
  cardFullName: string;
  cardPhone: string;
  cardHealthComplaints: string;
  cardDeliveryAddress: string;
  cardFinalDiagnosis: string | null;
  cardOilFromList: string | null;
  cardRecepi: string | null;
  card_IsChecked: boolean;
}
