<Tabbar
          onChange={index => {
            this.setState({
              currentIndex: index
            });
          }}
          current={this.state.currentIndex}
          color="black"
          activeColor="blue"
          list={[
            {
              pagePath: "pages/home/index",
              text: "首页",
              iconPath: "/images/tabbar/icon1_light.png",
              selectedIconPath: "/images/tabbar/icon1_light_active.png"
            },
            {
              pagePath: "pages/me/index",
              text: "我的",
              iconPath: "/images/tabbar/icon2_light.png",
              selectedIconPath: "/images/tabbar/icon2_light_active.png"
            }
          ]}
        />