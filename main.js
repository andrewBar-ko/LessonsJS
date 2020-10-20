'use strict';

// Функция проверки на число!
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// Месячный доход
let money; 
const start = function() {
   
    do {
        money = prompt('Ваш месячный доход?', '50000');
    } while (!isNumber(money));

};

start();

// Объект appData с переменными и методами
const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 100000,
    period: 12,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период', 'машина, квартплата, школа');
            appData.addExpenses = addExpenses.trim().toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке');
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        for (let i = 0; i < 2; i++) {
            
            let expensesItem = prompt('Введите обязательную статью расходов?');
            let sum = +prompt('Во сколько это обойдется?');
                
            while (!isNumber(sum)) {
               sum += +prompt('Во сколько это обойдется?'); 
            }
            appData.expenses[expensesItem] = +sum;
        }    
    },     
   
    // Функция возвращает сумму всех обязательных расходов за месяц
    getExpensesMonth: function() {

        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];

        }
        console.log('Расход за месяц:' + appData.expensesMonth);
        return appData.expensesMonth;
      
    },

    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getBudget: function() {

        if (!appData.budget) {
            appData.budget = 0;
        }
        
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        // budgetDay высчитываем исходя из значения месячного накопления
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);

    },

    // getTargetMonth -  Подсчитывает за какой период будет достигнута цель
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth);
        
    },
    
    // вызов функции getStatusIncome
    getStatusIncome: function() {
        if (appData.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
        }   else if (appData.budgetDay <= 1200 && appData.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        }   else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        }   else if (appData.budgetDay < 0) {
            return ('Что то пошло не так');
        }   else {
            return ('Введите данные!');
        }
    },
    targetMonth: function() {
    
        if (appData.getTargetMonth() > 0) {
            return console.log((`Цель будет достигнута за: ${appData.getTargetMonth()} месяца(ев)`));
        } else if (appData.getTargetMonth() < 0) {
            return console.log(('Цель не будет достигнута!'));
        }
    
    },

};
appData.asking();
appData.getBudget();
appData.getExpensesMonth();
appData.getTargetMonth();
appData.targetMonth();

console.log(appData.getStatusIncome());

for ( let key in appData) {
    console.log("Наша программа включает в себя данные: ");
    console.log(key, appData[key]);
}