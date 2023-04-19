import axios from "axios";
import Header from "../components/header/Header.jsx";
import StatisticCard from "../components/statistics/StatisticsCard.jsx";
import { Area, Pie } from "@ant-design/plots";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

const StatisticPage = () => {

  const { t } = useTranslation();

  const getProducts = () => {
    return axios.get(`http://localhost:5000/api/products/get-all`);
  };

  const { data:products } = useQuery("product", getProducts);

  const getBills = () => {
    return axios.get("http://localhost:5000/api/bills/get-all");
  };

  const { data } = useQuery("bills", getBills);
  console.log('data :>> ', data);

const user = JSON.parse(localStorage.getItem("posUser"))
  const config = {
    data:data?.data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data:data?.data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam\nDeğer",
      },
    },
  };

  const totalAmount = () => {
    const amount = data?.data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount?.toFixed(2)}₺`;
  };
  return (
    <div className="md:px-5 px-2">
      <Header />
      <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={data?.data?.length}
              img={"images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={totalAmount()}
              img={"images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={data?.data?.length}
              img={"images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Ürün"}
              amount={products?.data?.length}
              img={"images/product.png"}
            />
          </div>
      <div className="px-6 md:pb-0 pb-20">
        <h1 className="text-4xl font-bold text-center mb-4">İstatistiklerim</h1>
        <div className="statistic-section py-10">
          <h2 className="text-lg flex gap-x-2 py-2">
            {t("welcome")}
            <span className="text-green-700 font-bold text-xl">{user.email}</span>.
          </h2>
          <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
          <div className="lg:w-1/2 w-full lg:h-full h-72 md:px-3 px-1">
              <Area {...config} />
            </div>
            <div className="lg:w-1/2 w-ful  lg:h-full h-72 md:px-3 px-1">
              <Pie {...config2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;