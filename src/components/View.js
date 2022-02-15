import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as BsIcons from "react-icons/bs";

function View() {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [dataCollection, setDataCollection] = useState();
    const [isDeleted, setIsDeleted] = useState();

    const handleClick = (e) => {
        navigate("/home");
    };

    const dataFetcher = async () => {
        const response = await axios.get(
            "https://crypto-bd0e2-default-rtdb.firebaseio.com/cryptoapp.json"
        );
        const datas = response?.data;
        setDataCollection(datas);
        if (datas) {
            setData(Object.values(datas));
        }
    };

    useEffect(() => {
        dataFetcher();
    }, [isDeleted]);

    const deleteHandler = async (item) => {
        const { id } = item;
        let itemId;
        if (dataCollection) {
            let filterableData = Object.entries(dataCollection);
							//eslint-disable-next-line
            let filteredData = filterableData.map((item) => {
                if (item[1].id === id) {
                    itemId = item[0];
                }
            });
        }
        const response = await axios.delete(
            `https://crypto-bd0e2-default-rtdb.firebaseio.com/cryptoapp/${itemId}.json`
        );
        setIsDeleted(response);
    };
    console.log(data);

    return (
        <div className="table_container">
            <div className="view_table_class">SAVED DATA TABLE</div>
            <table className="table_class">
                <tbody>
                    {data &&
                        data.map((item) => (
                            <tr key={item.id}>
                                <td className="text-center fs-6 fw-bold">
                                    {item.name}
                                </td>
                                <td className="text-center fs-6">
                                    <li className="symbol_class">
                                        <BsIcons.BsDot size={20} />
                                        {item.symbol.toUpperCase()}
                                    </li>
                                </td>
                                <td className="text-center fs-6">
                                    {item.market_cap}
                                </td>
                                <td className="text-center fs-6">
                                    <div
                                        className="back_button_div"
                                        onClick={() => deleteHandler(item)}
                                    >
                                        DELETE
                                    </div>
                                </td>
                                <td className="text-center fs-6">
                                    ${item.current_price} <br />
                                    <span
                                        style={{ color: "grey", fontSize: 12 }}
                                    >
                                        USD
                                    </span>
                                </td>
                            </tr>
                        ))}
                    {(!data || data.length === 0) && (
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: 15,
                                padding: 5,
                            }}
                        >
                            No Crypto Details Found
                        </div>
                    )}
                </tbody>
            </table>
            <div className="back_button">
                <div className="back_button_div" onClick={handleClick}>
                    BACK
                </div>
            </div>
        </div>
    );
}

export default View;
