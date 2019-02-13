package com.revature.spark.todo;

import java.util.List;
import java.util.Map;

import com.revature.spark.beans.Doctor;
import com.revature.spark.beans.Patient;

/**
 * Within this class, you will implement the logic to calculate data for various
 * reports.
 * 
 * @author Your Name Here
 * 
 */
public class AssociateImplementation {

	/**
	 * Find the sum of all heart rates.
	 * 
	 * @param calls
	 * @return
	 */
	
	public Double sum(List<Patient> patients) {
		double sum = 0;
		for (int i=0; i<patients.size(); i++) {
			sum += (patients).get(i).getHeartRate();
		}
		return sum;
	}

	/**
	 * Find the lowest heart rate.
	 * 
	 * @param calls
	 * @return
	 */
	
	public Double min(List<Patient> patients) {
		double min = patients.get(0).getHeartRate();
		for (int i=0; i<patients.size()-1; i++) {
			if ((patients.get(i).getHeartRate()) < min) {
				min = patients.get(i).getHeartRate();		
			}
		}
		return min;
	}
	/**
	 * Find the highest heart rate.
	 * 
	 * @param calls
	 * @return
	 */
	public Double max(List<Patient> patients) {
		double max = patients.get(0).getHeartRate();
		for (int i=0; i<patients.size(); i++) {
			if ((patients.get(i).getHeartRate()) > max) {
				max = patients.get(i).getHeartRate();
			}
		}
		return max;
	}

	/**
	 * Find the average heart rate.
	 * 
	 * @param calls
	 * @return
	 */
	public Double avg(List<Patient> patients) {
		double sum = 0;
		for (int i=0; i<patients.size(); i++) {
			sum += (patients).get(i).getHeartRate();
		}
		return sum/patients.size();
	}

	/**
	 * Find the median heart rate.
	 * 
	 * @param calls
	 * @returny
	 */
	public Double median(List<Patient> patients) {
		double[] patientArray = new double[patients.size()] ;
		double median = 0;
		
		for(int i=0; i < patients.size(); i++) {
			patientArray[i] = patients.get(i).getHeartRate();
		}

		for(int i = 0; i < patientArray.length - 1; i++) {
			for(int j = 0; j < patientArray.length - 1- i; j++) {
				if(patientArray[j] > patientArray[j+1]) {
					double temp = patientArray[j];
					patientArray[j] = patientArray[j+1];
					patientArray[j+1] = temp;
				}
			}
		}
		
		
		if(patients.size() % 2 == 0) {
			median = ((double)patientArray[patients.size()/2] + (double)patientArray[(patients.size()/2-1)])/2;
		}else {
			median = (double)patientArray[patients.size()/2];
	}
		return median;
}
		
	


	/**
	 * !! BONUS CHALLENGE REQUIREMENT !!
	 * 
	 * Find the highest heart rate per doctor
	 * 
	 * @param calls
	 * @return
	 */
	
	public Map<Doctor, Double> highestPatientHeartRatePerDoctor(List<Patient> patients) {
		
		return null;
	}

}
