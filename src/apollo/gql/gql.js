import { gql } from "apollo-boost";

export const GET_PRODUCT = gql`
  query get_products($condition: Condition!) {
    get_products(condition: $condition) {
      uuid
      title
      price
      file_size
      thumbnail_images
      created_at
      like_count
      review_count
      rating_avg
      sell_count
      softwares {
        id
        name
      }
      user {
        uuid
        nickname
        images
      }
    }
  }
`;

// 상품 승인
export const CONFIRM_PRODUCT = gql`
  mutation EditProductStatusByOwner(
    $product_uuid: String!
    $status: ProductStatus!
  ) {
    edit_product_status_by_owner(product_uuid: $product_uuid, status: $status) {
      ok
      tx_id
    }
  }
`;

// 로그인
export const LOGIN_GQL = gql`
  mutation SignIn($email: String!, $password: String!) {
    sign_in(email: $email, password: $password) {
      uuid
      email
      blockchain_account
      public_key
      nickname
      access_token
      refresh_token
      is_creator
    }
  }
`;

// 로그아웃
export const LOGOUT_GQL = gql`
  mutation SignOut($refresh_token: String!) {
    sign_out(refresh_token: $refresh_token) {
      ok
    }
  }
`;

// 크리에이터 요청 리스트

export const CREATEORS_REQUEST_LIST = gql`
  query get_creators($condition: Condition!) {
    get_creators(condition: $condition) {
      tier
      status
      intro
      information
      created_at
      user {
        uuid
        nickname
        images
      }
    }
  }
`;

// 크리에이터 승인

export const CONFIRM_CREATORS = gql`
  mutation EditCreatorStatusByOwner(
    $user_uuid: String!
    $status: CreatorStatus!
  ) {
    edit_creator_status_by_owner(user_uuid: $user_uuid, status: $status) {
      ok
      tx_id
    }
  }
`;

// 쿠폰 지급

export const REWARD_COUPON = gql`
  mutation RewardCoupon(
    $user_uuid: String!
    $coupon_name: String!
    $count: Int!
  ) {
    reward_coupon(
      user_uuid: $user_uuid
      coupon_name: $coupon_name
      count: $count
    ) {
      ok
      tx_id
    }
  }
`;

// 크리에이터 등급 수정

export const SETCREATOR_TIER = gql`
  mutation SetCreatorTier($user_uuid: String!, $tier: CreatorTier!) {
    set_creator_tier(user_uuid: $user_uuid, tier: $tier) {
      ok
      tx_id
    }
  }
`;

// 판매내역 리스트

export const PRODUCT_SALELIST = gql`
  query GetTransactionHistory($condition: Condition) {
    get_transaction_history(condition: $condition) {
      product_uuid
      blockchain_trx_id
      pay
      buyer_blockchain_account
      status
      created_at
      hash
      product {
        title
        string_hash
        file_size
      }
      buyer {
        uuid
        nickname
      }
    }
  }
`;

// 트랜잭션 롤백

export const TRANSATION_ROLLBACK = gql`
  mutation TransactionRollback(
    $buyer_blockchain_account: String!
    $product_uuid: String!
  ) {
    transaction_rollback(
      buyer_blockchain_account: $buyer_blockchain_account
      product_uuid: $product_uuid
    ) {
      ok
      tx_id
    }
  }
`;

// 관리자 상품 삭제

export const REMOVE_PRODUCT_BY_ADMIN = gql`
  mutation remove_product_by_admin($product_uuid: String!) {
    remove_product_by_admin(product_uuid: $product_uuid) {
      ok
    }
  }
`;
