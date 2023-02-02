import React, { Component } from 'react'
import CompanyStore from '../stores/CompanyStore'
import Company from './Company'

class CompanyList extends Component {
	constructor() {
		super()
		this.state = {
			companies: [],
			editMode: false,
			companyToEdit: {}
		}

	}
	componentDidMount() {
		this.store = new CompanyStore()
		this.setState({
			companies: this.store.getAll()
		})
		this.store.emitter.addListener('UPDATE', () => {
			this.setState({
				companies: this.store.getAll()
			})
		})
	}

	handleOnEditclick = (company) => {
		this.setState({
			editMode: true,
			companyToEdit: company
		})
	}

	saveCompany = (id, company) => {
		this.store.saveOne(id, company);
		this.setState({ editMode: false });
	}

	render() {

		if (!this.state.editMode)
			return (
				<div>
					{this.state.companies.map((company, idx) => <Company key={idx} item={company} onClickEvent={this.handleOnEditclick} />)}
				</div>
			)
		else {
			return (

				<div style={{ display: 'flex', flexDirection: 'column', maxWidth: '150px', gap: '5px' }}>

					<input type='text' id='name' name='name' value={this.state.companyToEdit.name}
						onChange={(e) =>
							this.setState({
								companyToEdit: { ...this.state.companyToEdit, name: e.target.value }
							})}
					/>

					<input type='text' id='employees' name='employees' value={this.state.companyToEdit.employees}
						onChange={(e) =>
							this.setState({
								companyToEdit: { ...this.state.companyToEdit, employees: e.target.value }
							})}
					/>

					<input type='text' id='revenue' name='revenue' value={this.state.companyToEdit.revenue}
						onChange={(e) =>
							this.setState({
								companyToEdit: { ...this.state.companyToEdit, revenue: e.target.value }
							})}
					/>


					<button name='save' value='save' onClick={() => this.saveCompany(this.state.companyToEdit.id, this.state.companyToEdit)}>save</button>

					<button name='cancel' value='cancel' onClick={() => this.setState({
						editMode: false,
					})}
					>cancel</button>
				</div>

			)
		}
	}
}

export default CompanyList
