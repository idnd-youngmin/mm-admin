import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import { tableIcons } from "../../icons/tableIcon";
import { PRODUCT_SALELIST, TRANSATION_ROLLBACK } from "../../apollo/gql/gql";

const SaleList = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [datas, setDatas] = useState();
  const [products, setProducts] = useState();

  //   판매완료 리스트 불러오기
  const { loading, error, data, refetch } = useQuery(PRODUCT_SALELIST, {
    fetchPolicy: "no-cache",
    // "1", 판매완료
    variables: {
      condition: {
        where: "transaction_history.status=1",
        order_by: {
          field: "transaction_history.status",
          order: "DESC",
        },
        offset: 0,
        limit: 100,
      },
    },
  });

  // 트랜잭션 롤백
  const [transtionRollback, { data: confirm }] = useMutation(
    TRANSATION_ROLLBACK,
    {
      fetchPolicy: "no-cache",
      onCompleted(confirm) {
        if (confirm) {
          refetch();
        }
      },
    }
  );

  useEffect(() => {
    if (data) {
      setProducts(data.get_transaction_history.map((item) => item));
      console.log(data, "확인중@@@!!");
    }
    // console.log(
    //   data?.get_transaction_history.map(
    //     (item) => item.buyer_blockchain_account
    //   ),
    //   "데이터 확인중@@ buyer_blockchain_accountbuyer_blockchain_accountbuyer_blockchain_account"
    // );
    // console.log(products.blockchain_trx_id, "blockchain_trx_id");
  }, [data]);
  // console.log(
  //   products.blockchain_trx_id,
  //   "buyer_blockchain_accountbuyer_blockchain_account"
  // );
  const columns = [
    {
      title: "상품이름",
      field: "product.title",
    },
    {
      title: "구매자",
      field: "buyer.nickname",
    },
    {
      title: "구매 금액",
      field: "pay ",
      render: (rowData) => (
        <h1 className="ok">
          {/* {rowData}MM 안녕하세요 */}
          <h1>{rowData.pay} MM</h1>
        </h1>
      ),
    },
    // {
    //   title: "게시일",
    //   field: "게시일",
    // },
    {
      title: "용량",
      field: "용량",
    },
    // {
    //   title: "Avatar",
    //   field: "pay",
    //   render: (rowData) => (
    //     <h1 className="ok">
    //       {/* {rowData}MM 안녕하세요 */}
    //       <h1>헬로{rowData.pay}</h1>
    //       {console.log(rowData.pay, "rowDatarowData")}
    //     </h1>
    //   ),
    // },
  ];

  if (loading) return "Loading...";
  if (error) return "Error";

  return (
    <>
      <div className="productWrap">
        <MaterialTable
          //   style={{ width: "100%" }}
          title={"판매완료 상품 리스트 "}
          columns={columns}
          icons={tableIcons}
          data={products}
          onSelectionChange={(data) => setSelectedRow(data)}
          onRowClick={(event, rowData) => {
            // setToggle(!toggle);
            // setDatas(rowData);
          }}
          options={{
            sorting: false,
            searchFieldAlignment: "left",
            searchAutoFocus: true,
            paging: true,
            pageSize: 10,
            pageSizeOptions: [10, 20, 30, 40, 50],
            selection: true,
            showTextRowsSelected: false,
            // rowStyle: (rowData) => ({
            //   backgroundColor:
            //     selectedRow === rowData.tableData.id ? "#6ABAC9" : "#FFF",
            // }),
            // filtering: true,
            // actionsColumnIndex: -1,
          }}
          actions={[
            // {
            //   icon: () => (
            //     <Select
            //       labelId="demo-simple-select-label"
            //       id="demo-simple-select"
            //       style={{ width: 100 }}
            //       // value={age}
            //       // onChange={handleChange}
            //     >
            //       <MenuItem value={10}>All</MenuItem>
            //       <MenuItem value={20}>등록 요청대기</MenuItem>
            //       <MenuItem value={30}>수정 요청대기</MenuItem>
            //     </Select>
            //   ),
            //   tooltip: "상품 종류",
            //   isFreeAction: true,
            // },
            {
              icon: () => <AddBox></AddBox>,
              tooltip: "롤백",
              isFreeAction: false,
              onClick: async (e) => {
                e.preventDefault();
                try {
                  const uuid = await selectedRow.map(
                    (item) => item.product_uuid
                  );
                  const accountNumber = await selectedRow.map(
                    (item) => item.buyer_blockchain_account
                  );
                  await transtionRollback({
                    variables: {
                      buyer_blockchain_account: accountNumber.toString(),
                      product_uuid: uuid.toString(),
                    },
                  });
                  // console.log(
                  //   accountNumber.toString(),
                  //   "accountNumberaccountNumber"
                  // );
                } catch (e) {
                  console.log(e);
                }
              },
            },
          ]}
        />
      </div>
      {/* Modal box */}
      {/* {toggle && <Modal data={datas} toggle={toggle} setToggle={setToggle} />} */}
    </>
  );
};

export default SaleList;
