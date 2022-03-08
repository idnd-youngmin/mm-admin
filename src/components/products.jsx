import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import { tableIcons } from "../icons/tableIcon";
import Modal from "../common/modal";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useMutation, useQuery } from "react-apollo";
import { CONFIRM_PRODUCT, GET_PRODUCT } from "../apollo/gql/gql";

const Products = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [datas, setDatas] = useState();
  const [product, setProduct] = useState();
  const [toggle, setToggle] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCT, {
    fetchPolicy: "no-cache",
    // "product.starus=2", 요청대기중
    variables: {
      condition: {
        where: "(product.status=2 or product.status=3)",
        order_by: {
          field: "product.created_at",
          order: "DESC",
        },
        offset: 0,
        limit: 1000,
      },
    },
  });
  useEffect(() => {
    if (data) {
      setProduct(data.get_products.map((item) => item));
    }
  }, [data]);

  // 상품 판매 승인
  const [productConfirm, { data: confirm, loading: dataLoading }] = useMutation(
    CONFIRM_PRODUCT,
    {
      fetchPolicy: "no-cache",

      onCompleted(confirm) {
        if (confirm) {
          refetch();
        }
      },
    }
  );

  const columns = [
    {
      title: "상품이름",
      field: "title",
    },
    {
      title: "닉네임",
      field: "user.nickname",
    },
    {
      title: "가격",
      field: "price",
      render: (rowData) => <td>{rowData.price} MM</td>,
    },
    {
      title: "용량",
      field: "file_size",
    },
    {
      title: "게시일",
      field: "created_at",
      render: (rowData) => <td>{time(rowData.created_at)}</td>,
    },
  ];
  //날짜 수정
  const time = (date1) => {
    const date = new window.Date(date1);
    const year = date.getFullYear();
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " ";
  };
  if (loading) {
    <Box className="loadding">
      <CircularProgress />
    </Box>;
  }
  if (error) return "Error";

  return (
    <>
      {dataLoading && (
        <Box className="loadding">
          <CircularProgress />
        </Box>
      )}
      <div className="productWrap">
        <MaterialTable
          //   style={{ width: "100%" }}
          title={"등록 상품 리스트"}
          columns={columns}
          icons={tableIcons}
          data={product}
          onSelectionChange={(data) => setSelectedRow(data)}
          onRowClick={(event, rowData) => {
            setToggle(!toggle);
            setDatas(rowData);
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
              tooltip: "상품 등록 승인",
              isFreeAction: false,
              onClick: async (e) => {
                e.preventDefault();
                try {
                  const uuid = await selectedRow.map((item) => item.uuid);
                  // console.log(uuid, "유유아이뒤 확인중@@!");
                  for (let i = 0; i < uuid.length; i++) {
                    await productConfirm({
                      variables: {
                        product_uuid: uuid[i],
                        status: "ON_SALE",
                      },
                    });
                  }
                } catch (e) {
                  console.log(e);
                }
              },
            },
          ]}
        />
      </div>
      {/* Modal box */}
      {toggle && (
        <Modal
          data={datas}
          toggle={toggle}
          setToggle={setToggle}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default Products;
