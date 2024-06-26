import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages";
import Loader from "./Loader";
import { getListUsers, getUserProfile } from "../actions/userActions";
import { listBlogs } from "../actions/blogActions";
import ModalSubscriber from "./ModalSubscriber";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const blogList = useSelector((state) => state.blogList);
  const { error, loading, blogs } = blogList;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log("blogs estoy en el inicio es porque es el feed principal");
  useEffect(() => {
    dispatch(listBlogs());
    dispatch(getListUsers());
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  const handleClick = (event, blogId) => {
    event.preventDefault();
    if (userInfo && !userInfo.is_subscriber) {
      setIsModalOpen(true);
    } else {
      navigate(`/soloBlog/${blogId}`);
    }
  };

  const handleClickProfile = (event, userId) => {
    event.preventDefault();
    if (userInfo && !userInfo.is_subscriber) {
      setIsModalOpen(true);
    } else {
      navigate(`/userProfile/${userId}`);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div className="py-10 bg-gray-200 w-full">
          {blogs &&
            blogs.map((blog, index) => (
              <div key={index} className="py-8 w-full px-10">
                <div className="bg-white shadow-lg rounded-md overflow-hidden w-full">
                  <div className="flex w-full">
                    <div className="w-full">
                      <div className="flex justify-between items-center m-8">
                        <div className="flex flex-row items-center">
                          {users &&
                            users.map((user) => (
                              <div key={user.id}>
                                {user.user_name === blog.user && (
                                  <div className="flex flex-row items-center ml-2">
                                    <img
                                      src={`http://52.4.187.24${user.image}`}
                                      className="rounded-full"
                                      width="40"
                                    />
                                    <span className="font-bold mr-1 ml-2">
                                      {user.user_name}
                                    </span>
                                    <small className="h-1 w-1 bg-gray-300 rounded-full mr-1 mt-1"></small>
                                    <a
                                      style={{ textDecoration: "none" }}
                                      href={`/userProfile/${user.id}`}
                                      onClick={(event) =>
                                        handleClickProfile(event, user.id)
                                      }
                                      className="text-blue-600 text-sm hover:text-blue-800"
                                    >
                                      Ver perfil
                                    </a>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="text-left font-bold text-2xl px-10">
                        <span>{blog.title}</span>
                      </div>
                      <div className="p-4 flex justify-between items-center px-10">
                        <p>{blog.body}</p>
                      </div>
                      <div className="bg-white shadow rounded-lg p-6 mx-2">
                        <span className="block text-sm font-medium text-gray-700 pl-2">
                          Fuente
                        </span>
                        <ul className="list-none">
                          <li className="mb-2 pl-2 text-sm font-semibold tracking-wide text-blue-600">
                            <a
                              href={blog.sources}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {blog.sources}
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="p-4 flex justify-between items-center mx-5">
                        <div className="flex flex-row items-center ">
                          <a
                            style={{ textDecoration: "none" }}
                            href={`/soloBlog/${blog.id}`}
                            onClick={(event) => handleClick(event, blog.id)}
                            className="group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Ver Mas
                          </a>
                          <p className="mb-2 pl-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                            {blog.date.substring(0, 10)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {userInfo && !userInfo.is_subscriber && isModalOpen && (
            <ModalSubscriber onClose={() => setIsModalOpen(false)} />
          )}
        </div>
      )}
    </>
  );
}
