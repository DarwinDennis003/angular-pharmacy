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
}

export type PharmacyOrdersListTable = {
    id : string ,
    label: string;
    value ?: string | Date,
}

 export const PHARMACY_ORDERS_TABLE :PharmacyOrdersTable[] =[
    { id: 'doctor_name', label: 'Doctor Name' },
    { id: 'patient_name', label: 'Patient Name' },
    { id: 'gender', label: 'Gender' },
    { id: 'age', label: 'Age' },
    { id: 'patient_id', label: 'Patient ID' },
    { id: 'encounter_date', label: 'Encounter Date' },
    { id: 'dispensed_date', label: 'Dispensed Date' },
    { id: 'order_status', label: 'Order Status' },
    { id: 'department', label: 'Department' },
    { id: 'source', label: 'Source' }
 ];

 export const PHARMACY_ORDERS_LIST_ITEMS_TABLE  =[
    {id : 'selection_box' , label :'Select'} ,
    { id: 'drug_generic_name', label: 'Generic Name' },
    { id: 'drug_trade_name', label: 'Trade Name' },
    { id: 'drug_batch_number', label: 'Batch No' },
    { id: 'drug_expiry_date', label: 'Expiry Date' },
    { id: 'drug_frequency', label: 'Details' },
    { id: 'drug_stock', label: 'Stock' },
    { id: 'drug_unit_price', label: 'Unit Price' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'total_price', label: 'Total Price' },
    { id: 'is_dispensed', label: 'Status' }
 ];
