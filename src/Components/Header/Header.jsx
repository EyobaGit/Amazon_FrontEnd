import styles from './Header.module.css'
import LowerHeader from './LowerHeader';

import { Link } from 'react-router-dom';
import {useContext} from 'react'

import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";

import { DataContext } from '../DataProvider/DataProvider';
import {auth} from "../../Utility/firebase";

function Header() {
  const [{ user, basket }] = useContext(DataContext);
  // is the same with
  // const [state, dispatch] = useContext(DataContext);
  // const user = state.user;
  // const basket = state.basket;

  // console.log(basket)
  // console.log(basket.length)  //how many different products are in the cart
  //this doesn't consider the quantity of each item

  const totalItems = basket?.reduce((accumulator, currentItem) => {
    return currentItem.amount + accumulator;
  }, 0);
  // console.log(totalItems)  //how many total items (including multiples) are in the cart

  return (
    <section className={styles.fixed}>
      <section>
        <div className={styles.header__container}>

          {/* logo section*/}
          <div className={styles.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>

            {/* delivery */}
            <div className={styles.delivery}>
              <span>
                <SlLocationPin />
              </span>

              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* search section*/}
          <div className={styles.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>

            <input type="text" name="" id="" placeholder="search product" />
            <BsSearch size={40} />
          </div>

          {/*right side link  */}
          <div className={styles.order__container}>
            <Link to="" className={styles.language}>
              <img
src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Flag_of_the_United_States_%28fixed%29.svg/640px-Flag_of_the_United_States_%28fixed%29.svg.png"
                alt=""
              />
              <select>
                <option value="">EN</option>
              </select>
            </Link>

            {/* three components */}
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign out</span>
                  </>
                ) : (
                  <>
                    <p>Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>

            {/* orders */}
            <Link to="/orders">
              <div>
                <p>returns</p>
                <span>& Orders</span>
              </div>
            </Link>

            {/* cart */}
            <Link to="/cart" className={styles.cart}>
              <BiCart />
              <span> {totalItems} </span>
            </Link>
          </div>
        </div>
      </section>

      <LowerHeader />
    </section>
  );
}

export default Header