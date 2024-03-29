import { Truck, BarChartHorizontal, LayoutDashboard, Shapes, PackagePlus, Gem, Users, ClipboardX } from 'lucide-react';

const NameMenu = [
    {
        label: 'ພາບລວມ',
        key: 'dashborad',
        icon: <LayoutDashboard size={20} />,
    },
    {
        label: 'ນຳເຂົ້າ',
        key: 'import',
        icon: <PackagePlus size={20} />,
    },
    {
        label: 'ເບີກ ແລະ ຈັດສົ່ງ',
        key: 'preorder',
        icon: <Truck size={20} />,
    },
    {
        label: 'ຄັງສິນຄ້າ',
        key: 'product',
        icon: <Gem size={20} />,
    },
    // {
    //     label: 'ຈັດສົ່ງ',
    //     key: 'delivery',
    //     icon: <Truck size={20} />,
    // },
    {
        label: 'ສິນຄ້າເສຍ',
        key: 'getback',
        icon: <ClipboardX size={20} />,
    },
    {
        label: 'ລູກຄ້າ',
        key: 'customer',
        icon: <Users size={20} />,
    },
    {
        label: 'ປະເພດສິນຄ້າ',
        key: 'typeproduct',
        icon: <Shapes size={20} />,
    },
    {
        label: 'ລົດ',
        key: 'car',
        icon: <Truck size={20} />,
    },

    {
        label: 'ການລາຍງານ',
        key: 'report',
        icon: <BarChartHorizontal size={20} />,
    },
];

export default NameMenu