export enum HeaderBtnConstants {
    todayBtn = 'Today'
}

export const HEADER_DROPDOWNS = [
    {
        name : 'department',
        placeholder : 'Select Department',
        value : [],
    },
    {
        name : 'source',
        placeholder : 'Select Source',
        value : []
    }
]

export interface PharmacyOrders {
    drug_order_id: string;
    doctor_name?: string;
    patient_name?: string;
    gender?: string;
    age?: string;
    patient_id: string;
    encounter_date?: string;
    dispensed_date?: string;
    order_status?: string;
    department: string;
    source: string;
    created_at?: Date;
    updated_at?: Date;
}

export type PharmacyOrdersTable = {
    id : string ,
    label: string;
    value ?: string | Date,
    styleCallback ? : (x:any)=>string | null;
    width ?: string ;
}

export type PharmacyOrdersListTable = {
    id : string ,
    label: string;
    value ?: string | Date,
}

 export const PHARMACY_ORDERS_TABLE :PharmacyOrdersTable[] =[
    { id: 'doctor_name', label: 'Doctor Name' , width: '11vw'},
    { id: 'patient_name', label: 'Patient Name',    width: '10vw' },
    { id: 'gender', label: 'Gender',width: '5vw' },
    { id: 'age', label: 'Age' ,width: '5vw' },
    { id: 'patient_id', label: 'Patient ID',width: '7vw'  },
    { id: 'encounter_date', label: 'Encounter Date' , width: "9vw" },
    { id: 'dispensed_date', label: 'Dispensed Date' ,   width: "10vw" },
    { id: 'order_status', label: 'Order Status' ,styleCallback: (element : any) => {
        const status = element.order_status; 
        if (status == 'Dispensed') {
          return 'color-green';
        } else if (status == 'Partially-dispensed') {
          return 'color-yellow';
        } else if (status == 'Prescribed') {
          return '';
        } else {
          return ''; // Default or no additional styles
        }
      } ,     width: "11vw" },
    { id: 'department', label: 'Department' ,    width: "8vw"},
    { id: 'source', label: 'Source' }
 ];

 export const PHARMACY_ORDERS_LIST_ITEMS_TABLE  =[
    {id : 'selection_box' , label :'Select'} ,
    { id: 'drug_generic_name', label: 'Generic Name' },
    { id: 'drug_trade_name', label: 'Trade Name' },
    { id: 'drug_batch_number', label: 'Batch No',width: '8vw' },
    { id: 'drug_expiry_date', label: 'Expiry Date',width: '8vw' },
    { id: 'drug_frequency', label: 'Details' ,width: "9vw"},
    { id: 'drug_stock', label: 'Stock' ,width: "5vw"},
    { id: 'drug_unit_price', label: 'Unit Price',    width: "7vw" },
    { id: 'quantity', label: 'Quantity' , width: "6vw"},
    { id: 'total_price', label: 'Total Price' ,width: "7vw"},
    { id: 'status', label: 'Status' ,styleCallback: (element : any) => {
        const status = element.status; 
        if (status == 'Dispensed') {
          return 'color-green';
        } else if (status == 'Partially-dispensed') {
          return 'color-yellow';
        } else if (status == 'Not-dispensed') {
          return 'color-red';
        } else {
          return ''; // Default or no additional styles
        }
      }}
 ];
