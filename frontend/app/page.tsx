import styles from './page.module.css'
import MyName from './course02/myname'
// import MyButton from './mybutton'
import Click from './course02/click'
import ProductList from './course02/product/productList'
export default function Home() {
  return (<div className={styles.main}>
    <h1>Hello</h1>
    <MyName />
    {/* <MyButton />
    <MyButton /> */}
    <Click />
    <ProductList />
  </div>)
}