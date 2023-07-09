import './App.css';
import React from 'react';
import BlogList from './BlogList';
import PostList from './PostList';
import { RouterProvider, createBrowserRouter, Route, Outlet, Navigate, createRoutesFromElements, Link } from 'react-router-dom';
import blogUrl from './blogUrl';
import { fido } from './functions'
import ErrorComponent from './Error';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={
    <>
      <header><Link to="/">&#123;console.blog(this)&#125;</Link></header>
      <div id="sidebar">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem facere consequatur, minus cupiditate, laboriosam obcaecati distinctio tempora, id asperiores nisi voluptas blanditiis quidem saepe libero. Illo, soluta autem perspiciatis consequuntur modi totam quam dicta facere. Magnam aspernatur fugit veritatis ex laborum in modi sapiente expedita quis eum, similique deleniti animi, sed molestias delectus possimus. Animi ratione iste possimus nesciunt, ad labore quam porro debitis nemo cum ipsa natus. Fugiat illum aperiam ipsum id? Deserunt quam pariatur incidunt vero ab non, id dolorum accusamus qui officia consequatur quo totam voluptates libero cum a illum dolorem omnis, quia earum excepturi ad culpa aspernatur! Quos laboriosam tempore assumenda iste unde? Voluptatum eius ab officia sit error maiores soluta repellat nobis vel debitis, unde autem! Voluptatum voluptatibus maxime earum, atque amet beatae sapiente inventore? Ut velit, repudiandae consequatur impedit suscipit voluptate est nostrum nam nobis esse dolor! Maxime soluta error reprehenderit vel quisquam. Sapiente, eligendi aut esse velit commodi rem earum distinctio delectus laboriosam? Blanditiis in nam, obcaecati molestias minima ducimus ullam libero accusantium alias corporis repellat aliquid praesentium numquam, reiciendis impedit! Hic voluptatibus impedit vel reiciendis voluptatem error, labore nemo perspiciatis blanditiis maxime quas expedita corrupti provident, ex quaerat doloribus veniam aliquid quo!</div>
      <main>
        {<Outlet />}
      </main>
    </>
  } >
    <Route index element={<BlogList />} />
    <Route path='/postlist/:id' element={<PostList />} loader={({ params }) => fido(`${blogUrl('users')}?id=${params.id}`, (data) => { return data[0] })} errorElement={<ErrorComponent />} />
    <Route path="*" element={<Navigate to="/" replace="true" />} />
  </Route>
));

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}