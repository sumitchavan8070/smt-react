import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const plans = [
  {
    name: 'Starter',
    price: 29,
    features: ['400 GB Storage', 'Unlimited Photos & Videos', 'Exclusive Support'],
    buttonColor: '#FCA311',
    hoverButtonColor: '#14213D',
  },
  {
    name: 'Growth Plan',
    price: 59,
    features: ['400 GB Storage', 'Unlimited Photos & Videos', 'Exclusive Support'],
    buttonColor: '#14213D',
    hoverButtonColor: '#FCA311',
  },
  {
    name: 'Business',
    price: 139,
    features: ['400 GB Storage', 'Unlimited Photos & Videos', 'Exclusive Support'],
    buttonColor: '#FCA311',
    hoverButtonColor: '#14213D',
  },
];

const PricingCard = ({ plan }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{plan.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${plan.price}</Text>
        <Text style={styles.perMonth}>/per month</Text>
      </View>
      <Text style={styles.subtitle}>No credit card required</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: plan.buttonColor }]}>
        <Text style={styles.buttonText}>Try for free</Text>
      </TouchableOpacity>
      <View style={styles.featureList}>
        {plan.features.map((feature, index) => (
          <Text key={index} style={styles.featureItem}>{feature}</Text>
        ))}
      </View>
      <Text style={styles.trialText}>7-day free trial</Text>
    </View>
  );
};

const PricingCards = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {plans.map((plan, index) => (
        <PricingCard key={index} plan={plan} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '45%', 
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 36,
    fontWeight: '600',
    color: '#000',
  },
  perMonth: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: '#666',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  featureList: {
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
  trialText: {
    fontSize: 14,
    color: '#000',
  },
});

export default PricingCards;
