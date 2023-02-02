import React, { Component } from 'react'
import CompanyStore from '../stores/CompanyStore'
import Company from './Company'
import CompanyDetails from './CompanyDetails'

class CompanyList extends Component {
	constructor() {
		super()
		this.state = {
			companies: [],
			isSelected: false,
			selectedCompany: {}
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

	onSelect = (company) => {
		this.setState({
			isSelected: true,
			selectedCompany: company
		})
	}

	onCancel = () => {
		this.setState({
			isSelected: false,
			selectedCompany: {}
		})
	}

	render() {
		if (!this.state.isSelected)
			return (
				<div>
					{
						this.state.companies.map((e, i) =>
							<Company item={e} key={i} onSelect={this.onSelect} />
						)
					}
				</div>
			)

		else
			return <CompanyDetails item={this.state.selectedCompany} onCancel={this.onCancel} />
	}
}

export default CompanyList
