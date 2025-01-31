import React, { useState } from "react";
import {
  MdAddChart,
  MdDashboard,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { SiManageiq } from "react-icons/si";
import { FaJediOrder, FaUserCog } from "react-icons/fa";
import { GiSplitCross } from "react-icons/gi";
import { useAppSelector } from "../../redux/features/hook";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { Button, Layout, Menu, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { User } from "../../constants/type";

const { Header, Sider, Content } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user",
};
const MainLayout: React.FC = () => {
  const user = useAppSelector(useCurrentUser) as User;
  let sidebarItems;

  switch (user!.role) {
    case userRole.USER:
      sidebarItems = [
        {
          key: "UserDashboard",
          icon: <MdDashboard />,
          label: <NavLink to={"/user/dashboard"}>Dashboard</NavLink>,
        },
        {
          key: "view-order-history",
          icon: <FaMoneyCheckDollar />,
          label: (
            <NavLink to={"/user/dashboard/view-order-history"}>
              View order history
            </NavLink>
          ),
        },
      ];
      break;
    case userRole.ADMIN:
      sidebarItems = [
        {
          key: "AdminDashboard",
          icon: <MdDashboard />,
          label: <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>,
        },
        {
          key: "ProductManagement",
          icon: <MdOutlineProductionQuantityLimits />,
          label: "Product Management",
          children: [
            {
              key: "AddProduct",
              icon: <MdAddChart />,
              label: (
                <NavLink to={"/admin/dashboard/add-product"}>
                  Add Product
                </NavLink>
              ),
            },
            {
              key: "ManageProduct",
              icon: <SiManageiq />,
              label: (
                <NavLink to={"/admin/dashboard/manage-product"}>
                  Manage Product
                </NavLink>
              ),
            },
            {
              key: "ManagingOrders",
              icon: <FaJediOrder />,
              label: (
                <NavLink to={"/admin/dashboard/managing-orders"}>
                  Managing Orders
                </NavLink>
              ),
            },
          ],
        },
        {
          key: "UserManagement",
          icon: <FaUserCog />,
          label: "User Management",
          children: [
            {
              key: "DeactivatingAccounts",
              icon: <GiSplitCross />,
              label: (
                <NavLink to={"/admin/dashboard/deactivating-accounts"}>
                  Deactivating Accounts
                </NavLink>
              ),
            },
          ],
        },
      ];
      break;

    default:
      break;
  }

  // console.log(user);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={sidebarItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, position: "sticky", top: 0, zIndex: 1000 }}
          className=""
        >
          <Button
            className="cursor-pointer"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "white",
            }}
          />
        </Header>
        <Content
          style={{
            // margin: "24px 16px",
            // padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
