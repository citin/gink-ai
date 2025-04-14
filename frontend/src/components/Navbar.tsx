import React from 'react';

const Navbar: React.FC = () => {
	return (
		<div className="navbar bg-base-100 shadow-sm">
			<div className="flex-none lg:hidden">
				<label htmlFor="my-drawer" className="btn btn-square btn-ghost">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
				</label>
			</div>
			<div className="flex-1">
				<div className="flex flex-col">
					<span className="text-xl font-bold">Customer Feedback Analysis</span>
					<span className="text-xs text-gray-500">Powered by GPT-4</span>
				</div>
			</div>
			<div className="flex-none">
				<div className="dropdown dropdown-end mr-2">
					<label tabIndex={0} className="btn btn-ghost btn-circle border border-gray-300 hover:bg-gray-100">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
					</label>
					<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li><a className="hover:bg-gray-100">GPT-4</a></li>
						<li><a className="hover:bg-gray-100">Claude 3.5</a></li>
						<li><a className="hover:bg-gray-100">Gemini</a></li>
						<li><a className="hover:bg-gray-100">Mistral</a></li>
					</ul>
				</div>
				<button className="btn btn-ghost btn-circle border border-gray-300 hover:bg-gray-100 mr-2">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.002 6.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
				</button>
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-gray-300 hover:bg-gray-100">
						<div className="w-10 rounded-full">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-full stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
						</div>
					</label>
					<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li><a className="hover:bg-gray-100">Profile</a></li>
						<li><a className="hover:bg-gray-100">Settings</a></li>
						<li><a className="hover:bg-gray-100">Logout</a></li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar; 
