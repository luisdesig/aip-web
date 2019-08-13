import XLSX from 'xlsx';
import moment from 'moment';

export function exportarExcel(data){
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    return XLSX.writeFile(wb, `${moment().format('YYYY-MM-DD')}.xlsx`)
}