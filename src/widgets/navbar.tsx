import "./navbar.scss";
import iconInfo from "../assets/images/icon-info.svg";
import iconInfoDark from "../assets/images/icon-info-dark.svg";
import iconStatistic from "../assets/images/icon-statistic.svg";
import iconStatisticDark from "../assets/images/icon-statistic-dark.svg";

import { WordleContext } from "../App";
import { useContext, useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [timer, setTimer] = useState("");
  const [themeDark, setThemeDark] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalStsc, setShowModalStsc] = useState(false);

  const {
    word,
    totalGames,
    totalVictories,
    isVictory,
    setIsVictory,
    isNoVictory,
    setIsNoVictory,
  } = useContext(WordleContext);

  const onModeTheme = (event: any) => {
    if (event.target.checked) {
      setThemeDark(false);
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      setThemeDark(true);
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  const fiveMinutesInMs = 5 * 60 * 1000;
  const nowIsMs = new Date().getTime();
  const countDownDate = nowIsMs + fiveMinutesInMs;

  const intervalTimerRef: any = useRef(null);

  const initializeTimer = () => {
    intervalTimerRef.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const timerStr =
        "0" + minutes + ":" + (seconds >= 10 ? seconds : "0" + seconds);
      setTimer(timerStr);

      if (distance < 0) {
        resetTimer();
        setShowModalStsc(false);

        if (isVictory === true) {
          setIsVictory(false);
        }
        if (isNoVictory === true) {
          setIsNoVictory(false);
        }
      }
    }, 1000);
  };

  const resetTimer = () => {
    setTimer("");
    clearInterval(intervalTimerRef.current);
    intervalTimerRef.current = null;
  };

  useEffect(() => {
    const isShowModalInfo = localStorage.getItem("showModalInfo");
    if (!isShowModalInfo) {
      setShowModalInfo(true);
      localStorage.setItem("showModalInfo", "1");
    }
  }, []);

  const onAcceptStsc = () => {
    resetTimer();
    setShowModalStsc(false);

    if (isVictory === true) {
      setIsVictory(false);
    }
    if (isNoVictory === true) {
      setIsNoVictory(false);
    }
  };

  const onShowModalStsc = () => {
    setShowModalStsc(true);
  };

  useEffect(() => {
    if (isVictory === true) {
      setTimeout(() => {
        initializeTimer();
        setShowModalStsc(true);
      }, 2000);
    }
  }, [isVictory]);

  useEffect(() => {
    if (isNoVictory === true) {
      setTimeout(() => {
        initializeTimer();
        setShowModalStsc(true);
      }, 2000);
    }
  }, [isNoVictory]);

  return (
    <div>
      <div className="nav-bar px-6">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="w-1/3">
            <div className="flex items-center justify-start">
              <button type="button" onClick={() => setShowModalInfo(true)}>
                {themeDark ? (
                  <img src={iconInfoDark}></img>
                ) : (
                  <img src={iconInfo}></img>
                )}
              </button>
            </div>
          </div>
          <div className="w-1/3 title">WORDLE</div>
          <div className="w-1/3">
            <div className="flex items-center justify-end gap-4">
              <button type="button" onClick={() => onShowModalStsc()}>
                {themeDark ? (
                  <img src={iconStatisticDark}></img>
                ) : (
                  <img src={iconStatistic}></img>
                )}
              </button>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="1"
                    defaultChecked={true}
                    className="sr-only peer"
                    onClick={(event: any) => onModeTheme(event)}
                  />
                  <div
                    className={`switch ${
                      !themeDark ? "switch-checked" : ""
                    } bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-100 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[5px] after:left-[10px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
                  ></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModalInfo && (
        <div
          className="modal relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-20 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="modal-body p-10 relative transform overflow-hidden rounded-xl bg-transparent text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <section>
                  <div className="title">Cómo jugar</div>
                  <div className="mt-6">
                    Adivina la palabra oculta en cinco intentos.
                  </div>
                  <div className="mt-3">
                    Cada intento debe ser una palabra válida de 5 letras.
                  </div>
                  <div className="mt-3">
                    Después de cada intento el color de las letras cambia para
                    mostrar qué tan cerca estás de acertar la palabra.
                  </div>
                  <div className="mt-3">
                    <strong>Ejemplos</strong>
                  </div>
                  <div className="mt-3 flex flex-row items-center justify-center gap-2 cubes">
                    <div className="w-1/5 success">G</div>
                    <div className="w-1/5">A</div>
                    <div className="w-1/5">T</div>
                    <div className="w-1/5">O</div>
                    <div className="w-1/5">S</div>
                  </div>
                  <div className="mt-3">
                    La letra <strong>G</strong> está en la palabra y en la
                    posición correcta.
                  </div>
                  <div className="mt-3 flex flex-row items-center justify-center gap-2 cubes">
                    <div className="w-1/5">V</div>
                    <div className="w-1/5">O</div>
                    <div className="w-1/5 warning">C</div>
                    <div className="w-1/5">A</div>
                    <div className="w-1/5">L</div>
                  </div>
                  <div className="mt-3">
                    La letra <strong>C</strong> está en la palabra pero en la
                    posición incorrecta.
                  </div>
                  <div className="mt-3 flex flex-row items-center justify-center gap-2 cubes">
                    <div className="w-1/5">C</div>
                    <div className="w-1/5">A</div>
                    <div className="w-1/5">N</div>
                    <div className="w-1/5">T</div>
                    <div className="w-1/5 error">O</div>
                  </div>
                  <div className="mt-3">
                    La letra <strong>O</strong> no está en la palabra.
                  </div>
                  <div className="mt-7">
                    Puede haber letras repetidas. Las pistas son independientes
                    para cada letra.
                  </div>
                  <div className="mt-7 text-center">
                    ¡Una palabra nueva cada 5 minutos!
                  </div>
                  <div className="mt-7 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowModalInfo(false)}
                    >
                      !JUGAR¡
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModalStsc ? (
        <div
          className="modal relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-20 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="modal-body p-10 relative transform overflow-hidden rounded-xl bg-transparent text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <section>
                  <div className="title">Estadísticas</div>
                  <div className="mt-12 flex flex-row items-center ">
                    <div className="w-1/2 text-center">
                      <div className="text-3xl font-bold">{totalGames}</div>
                      <div className="mt-4">Jugadas</div>
                    </div>
                    <div className="w-1/2 text-center">
                      <div className="text-3xl font-bold">{totalVictories}</div>
                      <div className="mt-4">Victorias</div>
                    </div>
                  </div>
                  <div className="mt-16">
                    {isNoVictory && (
                      <div className="text-center mb-8">
                        La palabra era: <strong>{word}</strong>
                      </div>
                    )}
                    <div className="text-center">SIGUIENTE PALABRA</div>
                    <div className="mt-8 text-xl text-center font-bold">
                      {timer}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button type="button" onClick={() => onAcceptStsc()}>
                      Aceptar
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
