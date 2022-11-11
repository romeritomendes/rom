
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { RiGovernmentLine } from 'react-icons/ri';
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { IconType } from 'react-icons/lib';

interface ImenuItens {
    _id:    number;
    title:  string;
    path:   string;
    icon:   IconType;
    cName:  string;
    level:  number;
}

export const menuItens : ImenuItens[] = [
    {
        _id:   0,
        title: 'TimeSheet',
        path:  '/timesheet',
        icon:   HiOutlineClipboardList,
        cName: 'nav-text',
        level: 5,
    },
    {
        _id:   1,
        title: 'Extrato',
        path:  '/statement',
        icon:   HiOutlineClipboardList,
        cName: 'nav-text',
        level: 5,
    },
    {
        _id:    2,
        title: 'Fatura',
        path:  '/invoice',
        icon:   FaFileInvoiceDollar,
        cName: 'nav-text',
        level: 5,
    },
    {
        _id:   3,
        title: 'Impostos',
        path:  '/fee',
        icon:  RiGovernmentLine,
        cName: 'nav-text',
        level: 5,
    },
    {
        _id:   4,
        title: 'Salário',
        path:  '/salary',
        icon:  GiReceiveMoney,
        cName: 'nav-text',
        level: 5,
    },
    {
        _id:   5,
        title: 'Adiantamento',
        path:  '/report/advance',
        icon:  GiMoneyStack,
        cName: 'nav-text',
        level: 5,
    },
    {
        _id:   6,
        title: 'Pagamentos',
        path:  '/payment',
        icon:  GiPayMoney,
        cName: 'nav-text',
        level: 1,
    },
    {
        _id:   7,
        title: 'Contas',
        path:  '/report/iva',
        icon:  GiPayMoney,
        cName: 'nav-text',
        level: 1,
    },
    {
        _id:   8,
        title: 'IVA',
        path:  '/report/iva',
        icon:  GiPayMoney,
        cName: 'nav-text',
        level: 5,
    },
    {
        _id:   9,
        title: 'Projetos',
        path:  '/projects',
        icon:  GiPayMoney,
        cName: 'nav-text',
        level: 5,
    },
]