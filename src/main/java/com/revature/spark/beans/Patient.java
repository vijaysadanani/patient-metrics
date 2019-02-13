package com.revature.spark.beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class Patient implements Comparable<Patient>{

	@Id
	@Column(name="patient_id", nullable=false)
	@Min(value=0)
	private int id;
	
	@Column(name="first_name", nullable=false)
	@NotBlank
	private String firstName;
	
	@Column(name="last_name", nullable=false)
	@NotBlank
	private String lastName;
	
	@Column(name="heart_rate", nullable=false)
	@Min(value=0)
	private double heartRate;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="doctor_id", nullable=false)
	@NotNull
	private Doctor doctor;

	public Patient() {
		super();
	}

	public Patient(@Min(0) int id, @NotBlank String firstName, @NotBlank String lastName, @Min(0) double heartRate,
			@NotNull Doctor doctor) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.heartRate = heartRate;
		this.doctor = doctor;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public double getHeartRate() {
		return heartRate;
	}

	public void setHeartRate(double heartRate) {
		this.heartRate = heartRate;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((doctor == null) ? 0 : doctor.hashCode());
		result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
		long temp;
		temp = Double.doubleToLongBits(heartRate);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + id;
		result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Patient other = (Patient) obj;
		if (doctor == null) {
			if (other.doctor != null)
				return false;
		} else if (!doctor.equals(other.doctor))
			return false;
		if (firstName == null) {
			if (other.firstName != null)
				return false;
		} else if (!firstName.equals(other.firstName))
			return false;
		if (Double.doubleToLongBits(heartRate) != Double.doubleToLongBits(other.heartRate))
			return false;
		if (id != other.id)
			return false;
		if (lastName == null) {
			if (other.lastName != null)
				return false;
		} else if (!lastName.equals(other.lastName))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Patient [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", heartRate=" + heartRate
				+ ", doctor=" + doctor + "]";
	}

	@Override
	public int compareTo(Patient o) {
		if(this.heartRate > o.heartRate) {
			return 1;
		}else if(this.heartRate < o.heartRate) {
			return -1;
		}else {
			return 0;
		}
	}
}
